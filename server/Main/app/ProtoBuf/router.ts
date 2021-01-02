import { Router } from 'express'

import { getQuery } from './controllers'
const router = Router()
router.get("/:id", getQuery)

export default router