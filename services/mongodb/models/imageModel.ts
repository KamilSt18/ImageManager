import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
  sourceUrl: { type: String, required: true },
  status: { type: String, required: true },
  dateAdded: { type: Date, required: true },
  dateDownloaded: { type: Date },
  url: { type: String },
});


module.exports = mongoose.model('Image', imageSchema);