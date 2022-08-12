import bcrypt from "bcryptjs"
import { User } from '../model/user'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const signToken = _id => jwt.sign({ _id }, process.env.SECRET)

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email})
        if(!user) {
            res.status(401).json({message: 'Usuario y/o contraseña incorrecta'})
        } else {
            const isMatch = await bcrypt.compare(password, user.password)
            if(isMatch) {
                const signed = signToken(user._id)
                res.status(200).send(signed)
            } else {
                res.status(401).json({message: 'Usuario y/o contraseña incorrecta'})
            }
        }
    } catch (e) {
        return res.status(500).send(e.message)
    }
}