import mongoose from 'mongoose';

const animeNameSchema = new mongoose.Schema({
  animeName: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

// Prevent OverwriteModelError by checking if model exists
const AnimeName = mongoose.models.AnimeName || mongoose.model('AnimeName', animeNameSchema);

export default AnimeName;
