import bcrypt from "bcryptjs"
import { User } from '../model/user'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const signToken = _id => jwt.sign({ _id }, process.env.SECRET)

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const isUser = await User.findOne({ email: email })
        if(isUser) {
            res.send('Usuario ya registrado')
        } else {
            const salt = await bcrypt.genSalt()
            const hashed = await bcrypt.hash(password, salt)
            const user = await User.create({name: name, email: email, password: hashed, salt})

            const signed = signToken(user._id)

            res.send(signed)
        }
    } catch (e) {
        return res.status(500).send(e.message)
    }
}