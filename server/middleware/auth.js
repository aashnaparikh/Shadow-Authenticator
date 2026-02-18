const { verifyToken } = require('../config/jwt')
const User = require('../models/User')

const protect = async (req, res, next) => {
  let token

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Not authorized to access this route'
    })
  }

  try {
    // Verify token
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token'
      })
    }

    // Get user from token
    req.user = await User.findById(decoded.id).select('-password')
    
    if (!req.user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      })
    }

    next()
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'Not authorized to access this route'
    })
  }
}

module.exports = { protect }