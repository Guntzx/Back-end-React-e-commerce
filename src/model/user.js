import mongoose from 'mongoose'

export const User = mongoose.model('User',{
    name: { type: String, required: true },
    email: { type: String, required: true, minLength: 5 },
    password: { type: String, required: true, minLength: 5 },
    salt : { type: String, required: true}
})