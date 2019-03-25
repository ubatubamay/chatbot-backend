const mongoose = require('mongoose');
const { Schema } = mongoose;

const ImageSchema = new Schema({
    image: { type: String, required: true }
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
});

module.exports = mongoose.model('Image', ImageSchema);