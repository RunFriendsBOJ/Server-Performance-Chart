import RESTRouter from './app/REST/router'
import ProtoBufRouter from './app/ProtoBuf/router'
import { Router } from 'express'

const router = Router()


router.use('/rest', RESTRouter)
router.use('/protobuf', ProtoBufRouter)


export default router