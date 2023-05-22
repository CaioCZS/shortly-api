import { Router } from "express"
import { authValidation } from "../middlewares/authValidation.middleware.js"
import { getUserMe } from "../controllers/user.controllers.js"

const userRouter = Router()

userRouter.get("/users/me", authValidation, getUserMe)

export default userRouter
