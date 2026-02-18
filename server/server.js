require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const connectDB = require('./config/database')

const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Test route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'success',
    message: 'Shadow-Auth API is running',
    timestamp: new Date().toISOString()
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    status: 'error',
    message: 'Route not found' 
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    status: 'error',
    message: 'Something went wrong!' 
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`)
})