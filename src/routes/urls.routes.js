import { Router } from "express"
import {
  deleteUrlById,
  getUrlById,
  openUrlByShortUrl,
  postUrlShorten,
} from "../controllers/url.controllers.js"
import { schemaValidation } from "../middlewares/schemaValidation.middleware.js"
import { urlSchema } from "../schemas/url.schemas.js"
import { authValidation } from "../middlewares/authValidation.middleware.js"

const urlRouter = Router()

urlRouter.post(
  "/urls/shorten",
  schemaValidation(urlSchema),
  authValidation,
  postUrlShorten
)
urlRouter.get("/urls/:id", getUrlById)
urlRouter.get("/urls/open/:shortUrl", openUrlByShortUrl)
urlRouter.delete("/urls/:id", authValidation, deleteUrlById)

export default urlRouter
