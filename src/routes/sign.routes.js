import { Router } from "express"
import { signin, signup } from "../controllers/sign.controllers.js"
import { schemaValidation } from "../middlewares/schemaValidation.middleware.js"
import { singUpSchema } from "../schemas/signup.schema.js"

const signRouter = Router()

signRouter.post("/signup", schemaValidation(singUpSchema), signup)
signRouter.post("/signin", signin)

export default signRouter
