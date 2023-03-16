`
thoughtText
    string
    required
    must be 1-280 characters

createdAt
    date
    set default value to current timestamp
    use getter method to format the timestamp query
    
username (user that created this thought)
    string
    required    

reactions
    array of nested documents created within the reactionSchema
    `
    const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionBody: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toLocaleString()
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
});

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
