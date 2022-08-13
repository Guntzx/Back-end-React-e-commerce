import bcrypt from "bcryptjs"
import { User } from '../model/user'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

//const signToken = _id => jwt.sign({ _id }, process.env.SECRET)

export const register = async (req, res) => {
    try {
        const { name, lastname, email, password } = req.body
        const isUser = await User.findOne({ email: email })
        if(isUser) {
            res.status(400).json({message: 'Usuario ya registrado'})
        } else {
            const salt = await bcrypt.genSalt()
            const hashed = await bcrypt.hash(password, salt)
            const user = await User.create({name: name, lastname: lastname, email: email, password: hashed, salt})

            //const signed = signToken(user._id)

            res.status(200).json({message: 'Usuario Registrado'})
        }
    } catch (e) {
        return res.status(500).send(e.message)
    }
}