import mongoose from 'mongoose';

const animeVideoSchema = new mongoose.Schema({
  animeName: { type: String, required: true },
  videoUrl: { type: String, required: true },
});

// Prevent OverwriteModelError by checking if model exists
const AnimeVideo = mongoose.models.AnimeVideo || mongoose.model('AnimeVideo', animeVideoSchema);

export default AnimeVideo;
