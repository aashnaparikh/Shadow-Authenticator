const mongoose = require('mongoose')

const BehavioralProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  // Keystroke Dynamics Data
  keystrokeDynamics: {
    avgDwellTime: {
      type: Number,
      default: 0
    },
    stdDwellTime: {
      type: Number,
      default: 0
    },
    avgFlightTime: {
      type: Number,
      default: 0
    },
    stdFlightTime: {
      type: Number,
      default: 0
    },
    typingSpeed: {
      type: Number,
      default: 0
    }
  },
  
  // Mouse Pattern Data
  mousePatterns: {
    avgVelocity: {
      type: Number,
      default: 0
    },
    stdVelocity: {
      type: Number,
      default: 0
    },
    avgAcceleration: {
      type: Number,
      default: 0
    },
    avgCurvature: {
      type: Number,
      default: 0
    }
  },
  
  // Encrypted behavioral fingerprint (for comparison)
  behavioralHash: {
    type: String,
    required: false
  },
  
  // Training metadata
  trainingSessionsCount: {
    type: Number,
    default: 0
  },
  
  isTrainingComplete: {
    type: Boolean,
    default: false
  },
  
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Update lastUpdated on every save
BehavioralProfileSchema.pre('save', function(next) {
  this.lastUpdated = Date.now()
  next()
})

module.exports = mongoose.model('BehavioralProfile', BehavioralProfileSchema)