import mongoose from 'mongoose'

export const Image = mongoose.model('Image', {
    user_email: { type: String, required: true},
    img_id: { type: String, required: true},
    img_url: { type: String, required: true},
    img_description: { type: String, required: false},
})