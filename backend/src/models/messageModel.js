const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  // userId: { 
  //   type: String,
  //   required: true 
  // },
  role: { 
    type: String, 
    enum: ['user', 'assistant'], 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Message', MessageSchema);
