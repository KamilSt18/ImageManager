import { Router, Response } from "express"
import { createResponse } from "../services/createResponse"
import { postImages } from "../constrollers/imagesController"

export const router = Router()

router.post("/", postImages)

// Middleware - no endpoint matching
router.use((_, res: Response) => {
	res
		.status(404)
		.json(createResponse("No route found", "error", "404 - Not Found"))
})
