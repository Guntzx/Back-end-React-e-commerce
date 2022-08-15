export const user = async (req, res) => {
    try {
        const { name, lastname } = req.user

        const Name = name+' '+lastname

        return res.status(200).json(Name)
    } catch (e) {
        console.error(e)
        return res.status(500).send(e.message)
    }
}