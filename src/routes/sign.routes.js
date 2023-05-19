import { Router } from "express"
import { signin, signup } from "../controllers/sign.controllers.js"
import { schemaValidation } from "../middlewares/schemaValidation.middleware.js"
import { signInSchema, singUpSchema } from "../schemas/sign.schema.js"

const signRouter = Router()

signRouter.post("/signup", schemaValidation(singUpSchema), signup)
signRouter.post("/signin", schemaValidation(signInSchema), signin)

export default signRouter
