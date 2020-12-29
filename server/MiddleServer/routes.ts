import RESTRouter from './app/REST/router'
import { Router } from 'express'

const router = Router()


router.use('/rest', RESTRouter)

export default router