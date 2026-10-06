const db = require('../config/db');
const { matchDonorsForRequest } = require('../services/matchingService');

const createRequest = async (req, res) => {
  try {
    const {
      bloodGroup,
      unitsRequired,
      hospitalName,
      hospitalAddress,
      city,
      urgency = 'HIGH',
      requesterName,
      requesterPhone,
      additionalNotes
    } = req.body;

    if (!bloodGroup || !unitsRequired || !hospitalName || !city) {
      return res.status(400).json({ message: 'Blood group, units, hospital name, and city are required' });
    }

    const patientId = req.user ? req.user.id : 'guest_patient';

    const newRequest = await db.bloodRequests.create({
      patientId,
      requesterName: requesterName || req.user?.name || 'Patient Attender',
      requesterPhone: requesterPhone || req.user?.phone || '555-0192',
      bloodGroup,
      unitsRequired: parseInt(unitsRequired, 10),
      hospitalName,
      hospitalAddress: hospitalAddress || `${hospitalName}, ${city}`,
      city,
      location: city,
      urgency,
      status: 'Searching',
      matchedDonorIds: [],
      acceptedDonorId: null,
      additionalNotes: additionalNotes || '',
      timePosted: 'Just now'
    });

    // Run smart matching algorithm
    const matchResult = await matchDonorsForRequest(newRequest);

    const updatedRequest = await db.bloodRequests.findByIdAndUpdate(newRequest.id, {
      matchedDonorIds: matchResult.matchedDonors.map(m => m.donorId)
    });

    res.status(201).json({
      request: updatedRequest,
      matchedDonors: matchResult.matchedDonors,
      disclaimer: matchResult.disclaimer
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error creating blood request' });
  }
};

const getRequests = async (req, res) => {
  try {
    const { urgency, status, bloodGroup, city, patientId } = req.query;
    let requests = await db.bloodRequests.find();

    if (patientId) {
      requests = requests.filter(r => r.patientId === patientId);
    }
    if (urgency && urgency !== 'All') {
      requests = requests.filter(r => r.urgency === urgency);
    }
    if (status && status !== 'All') {
      requests = requests.filter(r => r.status === status);
    }
    if (bloodGroup && bloodGroup !== 'All') {
      requests = requests.filter(r => r.bloodGroup === bloodGroup);
    }
    if (city) {
      requests = requests.filter(r => r.city?.toLowerCase().includes(city.toLowerCase()));
    }

    // Sort newest first
    requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching requests' });
  }
};

const getRequestById = async (req, res) => {
  try {
    const request = await db.bloodRequests.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Get matched donor details
    const matchedDonors = [];
    if (request.matchedDonorIds && request.matchedDonorIds.length > 0) {
      for (const donorId of request.matchedDonorIds) {
        const donor = await db.donors.findById(donorId);
        if (donor) {
          matchedDonors.push(donor);
        }
      }
    }

    // Get accepted donor details if any
    let acceptedDonor = null;
    if (request.acceptedDonorId) {
      acceptedDonor = await db.donors.findById(request.acceptedDonorId);
    }

    res.json({
      ...request,
      matchedDonorDetails: matchedDonors,
      acceptedDonorDetail: acceptedDonor,
      disclaimer: "BloodLink is a coordination platform. Final donor eligibility and blood transfusion compatibility must always be confirmed by qualified medical professionals and the relevant hospital/blood bank."
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching request details' });
  }
};

const updateRequest = async (req, res) => {
  try {
    const updated = await db.bloodRequests.findByIdAndUpdate(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error updating request' });
  }
};

const acceptRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const request = await db.bloodRequests.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Find donor associated with logged in user
    let donor = await db.donors.findOne({ userId: req.user.id });
    if (!donor) {
      donor = await db.donors.findOne({ email: req.user.email });
    }

    if (!donor) {
      return res.status(404).json({ message: 'Donor profile not found for this user' });
    }

    const updatedRequest = await db.bloodRequests.findByIdAndUpdate(requestId, {
      acceptedDonorId: donor.id,
      status: 'Donor Found'
    });

    // Create donation record
    await db.donations.create({
      requestId: request.id,
      donorId: donor.id,
      hospitalName: request.hospitalName,
      bloodGroup: request.bloodGroup,
      units: request.unitsRequired,
      status: 'Scheduled',
      donationDate: new Date().toISOString().split('T')[0]
    });

    // Notify patient
    await db.notifications.create({
      userId: request.patientId,
      type: 'Request Accepted',
      title: `Donor Matched for ${request.bloodGroup} Request!`,
      description: `${donor.name} has accepted your request for ${request.unitsRequired} unit(s) of ${request.bloodGroup} blood at ${request.hospitalName}.`,
      isRead: false,
      link: `/patient/track-request`
    });

    res.json({
      message: 'Request accepted successfully!',
      request: updatedRequest
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error accepting request' });
  }
};

const rejectRequest = async (req, res) => {
  try {
    res.json({ message: 'Request declined' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error declining request' });
  }
};

module.exports = {
  createRequest,
  getRequests,
  getRequestById,
  updateRequest,
  acceptRequest,
  rejectRequest
};
