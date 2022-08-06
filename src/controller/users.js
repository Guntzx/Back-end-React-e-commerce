import { User } from '../model/user'

export const Users = async (req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json(users)
    } catch (e) {
        return res.status(500).send(e.message)
    }
}