import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  content: {
    type: String, required: [true, "You can't post an empty comment!"]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})


const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  ingredients: [{
    type: String,
    required: true
  }],
  instructions: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [commentSchema]
});

export default mongoose.model('Recipe', recipeSchema);