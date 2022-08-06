import express from 'express'
import { expressjwt } from 'express-jwt'
import { User } from '../model/user'
import 'dotenv/config'

const validateJwt = expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] })

const findAndAssingUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.auth._id)
        if(!user) {
            return res.status(401).end()
        }
        req.user = user
        next()
    } catch (e) {
        next(e)
    }
}

export const isAuthenticated = express.Router().use(validateJwt, findAndAssingUser)