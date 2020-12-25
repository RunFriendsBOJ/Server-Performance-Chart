import { Router } from 'express'

import { allPost, getPost } from './controllers'
const router = Router()
router.get("/all", allPost)
router.get("/:id", getPost)

export default router