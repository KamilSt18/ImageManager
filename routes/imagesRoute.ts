import { Router, Response } from "express"

import { CreateResponse } from "../helpers/responses/CreateResponse"

import {
	deleteImage,
	getImage,
	getImages,
	postImage,
} from "../constrollers/imagesController"

export const router = Router()

router.get("/", getImages)

router.get("/:id", getImage)

router.post("/", postImage)

router.delete("/:id", deleteImage)

// Middleware - no endpoint matching
router.use((_, res: Response) => {
	res
		.status(404)
		.json(
			CreateResponse(
				"No route found for endpoint /images",
				"error",
				"404 - Not Found"
			)
		)
})
