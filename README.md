# 🩸 BloodLink — Blood Donation, Emergency Request & Hospital Coordination Platform

**Connect. Donate. Save Lives.**

BloodLink is an enterprise-grade, intelligent healthcare technology platform designed to streamline emergency blood donation, donor matching, and hospital inventory management.

---

## ✨ Design System & Visual Identity

BloodLink features a custom healthcare color palette:
- **Primary Brand**: Deep Burgundy (`#7F1D3A`)
- **Secondary Brand**: Deep Plum (`#4A2545`)
- **Main Canvas**: Warm Ivory (`#FAF9F6`)
- **Card Background**: Soft Off-White (`#FFFFFF`)
- **Success & Verified**: Muted Emerald (`#27836A`)
- **Urgency & Warning**: Warm Amber (`#C58A2B`)
- **Critical & Error**: Deep Coral (`#C94B4B`)

---

## 🚀 Key Features

- **Public Health Hub**: Real-time donor search, emergency requests feed, hospital network directory, and donor registration.
- **Smart Donor Matching Algorithm**: Auto-matches compatibility (ABO/Rh matrix), distance proximity, donor availability, and emergency urgency level.
- **Role-Based Portals**:
  - 🩸 **Donor Portal**: Availability toggles, nearby request alerts, donation history, and notification center.
  - 🏥 **Patient Portal**: 5-step emergency request wizard, real-time request tracker, and history log.
  - 🏥 **Hospital Operations**: Real-time blood stock inventory management, request monitoring, and donor registry.
  - ⚡ **Admin Analytics**: Interactive Recharts analytics (monthly trends, blood group distribution, hospital fulfillment, request status).

---

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide React, Recharts, React Router v6, Axios.
- **Backend**: Node.js, Express.js, JWT Authentication, bcryptjs, RESTful API.
- **Database**: Integrated file-backed JSON database engine with Mongoose query API compatibility.

---

## 🔑 Quick Demo Accounts

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@bloodlink.org` | `password123` |
| **Donor** | `donor@bloodlink.org` | `password123` |
| **Patient** | `patient@bloodlink.org` | `password123` |
| **Hospital** | `contact@citycentralhealth.org` | `password123` |

---

## 🚀 Local Development Setup

### 1. Backend Setup
```bash
cd backend
npm install
npm run seed
node src/server.js
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev -- --port 3000 --host
```

Access the application in your browser at `http://localhost:3000`.
