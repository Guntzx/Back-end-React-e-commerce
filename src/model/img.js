import mongoose from 'mongoose'

export const image = mongoose.model('Image', {
    user_id: { type: String, required: true},
    img_id: { type: String, required: true},
    img_url: { type: String, required: true},
    img_description: { type: String, required: true}
})