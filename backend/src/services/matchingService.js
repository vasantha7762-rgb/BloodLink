const db = require('../config/db');

const BLOOD_COMPATIBILITY = {
  'O-': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'A-': ['A+', 'A-', 'AB+', 'AB-'],
  'A+': ['A+', 'AB+'],
  'B-': ['B+', 'B-', 'AB+', 'AB-'],
  'B+': ['B+', 'AB+'],
  'AB-': ['AB+', 'AB-'],
  'AB+': ['AB+']
};

const getCompatibleDonorGroups = (patientGroup) => {
  const compatible = [];
  for (const [donorGroup, recipientGroups] of Object.entries(BLOOD_COMPATIBILITY)) {
    if (recipientGroups.includes(patientGroup)) {
      compatible.push(donorGroup);
    }
  }
  return compatible;
};

const calculateDistanceKm = (city1, city2) => {
  if (!city1 || !city2) return 5.0;
  if (city1.toLowerCase().trim() === city2.toLowerCase().trim()) return 3.2;
  return 12.5;
};

const matchDonorsForRequest = async (request) => {
  const compatibleGroups = getCompatibleDonorGroups(request.bloodGroup);
  const allDonors = await db.donors.find();

  const matchedDonors = [];

  for (const donor of allDonors) {
    if (donor.availability !== 'available') continue;
    if (!compatibleGroups.includes(donor.bloodGroup)) continue;

    const distance = calculateDistanceKm(donor.city, request.city);
    let matchScore = 100;

    if (donor.bloodGroup === request.bloodGroup) matchScore += 20;
    if (donor.city?.toLowerCase() === request.city?.toLowerCase()) matchScore += 30;
    if (request.urgency === 'CRITICAL') matchScore += 25;
    if (request.urgency === 'URGENT') matchScore += 15;

    matchedDonors.push({
      donorId: donor.id,
      userId: donor.userId,
      name: donor.name,
      bloodGroup: donor.bloodGroup,
      distanceKm: distance,
      score: matchScore
    });

    // Create notification for matched donor
    await db.notifications.create({
      userId: donor.userId,
      type: 'Emergency Request',
      title: `${request.urgency} Request: ${request.bloodGroup} Blood Needed`,
      description: `New ${request.urgency.toLowerCase()} request for ${request.unitsRequired} units of ${request.bloodGroup} at ${request.hospitalName}, ${request.city}.`,
      isRead: false,
      link: `/donor/requests`
    });
  }

  matchedDonors.sort((a, b) => b.score - a.score);

  return {
    matchedDonors,
    disclaimer: "BloodLink is a coordination platform. Final donor eligibility and blood transfusion compatibility must always be confirmed by qualified medical professionals and the relevant hospital/blood bank."
  };
};

module.exports = {
  getCompatibleDonorGroups,
  matchDonorsForRequest
};
