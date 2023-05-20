import { Router } from "express"
import signRouter from "./sign.routes.js"
import urlRouter from "./urls.routes.js"

const router = Router()

router.use(signRouter)
router.use(urlRouter)

export default router
