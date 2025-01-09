import mongoose from 'mongoose';

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
});

export default mongoose.model('Recipe', recipeSchema);