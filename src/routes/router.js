import { Router } from 'express';
import { register } from '../controller/register'
import { login } from '../controller/login'
import { user } from '../controller/profile'
import { isAuthenticated } from '../middleware/verifyUser'
import { SaveImg, BuyImg, GetSaveImg } from '../controller/image'

const router = Router()

router.get('/', async (req, res) => {
    res.send('API para registrar usuarios, loguearlos, entregar un token y acceder a la lista de nombres')
})

router.post('/register', register)

router.post('/login', login)

router.get('/user', isAuthenticated, user)

router.post('/img/save', isAuthenticated, SaveImg)

router.post('/img/buy', isAuthenticated, BuyImg)

router.get('/user/save/images', isAuthenticated, GetSaveImg)

router.get('*', async (req, res) => {
    return res.status(404).send('Esta ruta no existe :(')
})

export default router