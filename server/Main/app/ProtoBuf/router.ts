import { Router } from 'express'

import { getQuery } from './controllers'
const router = Router()
router.post("/:id", getQuery)

export default router