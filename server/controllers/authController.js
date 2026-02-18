const User = require('../models/User')
const BehavioralProfile = require('../models/BehavioralProfile')
const { generateToken } = require('../config/jwt')

// Register new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide username, email, and password'
      })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    })

    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'User with this email or username already exists'
      })
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password
    })

    // Create empty behavioral profile
    await BehavioralProfile.create({
      userId: user._id
    })

    // Generate token
    const token = generateToken(user._id)

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      }
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Error registering user',
      error: error.message
    })
  }
}

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide email and password'
      })
    }

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      })
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      })
    }

    // Update last login
    user.lastLogin = Date.now()
    await user.save()

    // Generate token
    const token = generateToken(user._id)

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Error logging in',
      error: error.message
    })
  }
}

// Get current user
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
          lastLogin: user.lastLogin
        }
      }
    })
  } catch (error) {
    console.error('GetMe error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Error fetching user data'
    })
  }
}