import { Router } from 'express';
import { register } from '../controller/register'
import { login } from '../controller/login'
import { isAuthenticated } from '../middleware/verifyUser'
import { Users } from '../controller/users'

const router = Router()

router.get('/', async (req, res) => {
    res.send('API para registrar usuarios, loguearlos, entregar un token y acceder a la lista de nombres')
})

router.get('/users', isAuthenticated, Users)

router.post('/register', register)

router.post('/login', login)

router.get('*', async (req, res) => {
    return res.status(404).send('Esta ruta no existe :(')
})

export default router