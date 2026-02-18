# 🔐 Shadow-Auth

Advanced behavioral biometric authentication system combining traditional passwords with real-time keystroke dynamics and mouse tracking for adaptive, continuous user verification.

## 🎯 Overview

Shadow-Auth analyzes how users interact with their devices, creating a unique behavioral "fingerprint" from typing patterns and mouse movements. Even with a stolen password, unauthorized users are detected and blocked based on behavioral mismatches.

## ✨ Features

- **Behavioral Biometrics** - Keystroke dynamics and mouse pattern analysis
- **Machine Learning** - Client-side neural networks with Brain.js
- **Adaptive Authentication** - Risk-based verification decisions
- **JWT Security** - Token-based session management
- **Privacy-First** - All ML processing happens client-side
- **Premium UI** - Banking-grade interface with glassmorphism design

## 🛠️ Tech Stack

**Backend:** Node.js, Express, MongoDB, JWT, bcrypt  
**Frontend:** React 18, Vite, Brain.js, Axios  
**Security:** Helmet, CORS, AES-256 encryption

## 🚀 Quick Start
```bash
# Clone repository
git clone https://github.com/aashnaparikh/shadow-authenticator.git
cd shadow-authenticator

# Install dependencies
cd server && npm install
cd ../client && npm install

# Configure environment
cp server/.env.example server/.env
cp client/.env.example client/.env
# Edit .env files with your values

# Start MongoDB
brew services start mongodb-community@7.0

# Run application
cd server && node server.js
cd ../client && npm run dev
```

Visit: `http://localhost:5173`

## 📊 How It Works

**Training (Registration)**  
User provides 5+ typing samples → System extracts timing patterns → Neural network learns unique behavioral signature

**Verification (Login)**  
Live behavioral data captured → ML model scores confidence (0-1) → Risk assessment triggers additional verification if needed

## 🔐 Security

- Password hashing with bcrypt
- Client-side ML processing
- Encrypted behavioral data storage
- HTTPS-only transmission
- Rate limiting and security headers

## 📁 Project Structure
```
shadow-auth/
├── client/          # React frontend
├── server/          # Node.js backend
│   ├── models/      # MongoDB schemas
│   ├── routes/      # API endpoints
│   └── middleware/  # Auth & security
└── README.md
```

## 📝 License

MIT License



