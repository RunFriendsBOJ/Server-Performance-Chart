import postRouter from './app/post/router'
import { Router } from 'express'

const router = Router()

router.use('/post', postRouter)

export default router