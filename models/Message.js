const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
    senderName: { type: String, required: true },
    text: { type: String },
    file: { type: Object }
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Message', MessageSchema);