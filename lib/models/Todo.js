import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
  },
  userId: {
    type: String,
    required: [true, 'User ID is required'],
  },
  userName: {
    type: String,
    required: [true, 'User name is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Prevent mongoose from creating the model multiple times
const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);

export default Todo; 