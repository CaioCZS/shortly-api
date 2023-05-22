import { Router } from "express"
import signRouter from "./sign.routes.js"
import urlRouter from "./urls.routes.js"
import userRouter from "./user.routes.js"

const router = Router()

router.use(signRouter)
router.use(urlRouter)
router.use(userRouter)

export default router
