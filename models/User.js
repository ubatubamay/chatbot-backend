const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    userName: { type: String, required: true }
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
});

module.exports = mongoose.model('Users', UserSchema);