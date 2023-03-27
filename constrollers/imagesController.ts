import { Request, Response } from "express"
import { createResponse } from "../services/createResponse"
import { address } from ".."
import { addImage } from "../services/addImage"
import { ImageType } from "../models/ImageType"
import { fetchImage } from "../services/fetchImage"
import { fetchImages } from "../services/fetchImages"
import { removeImage } from "../services/removeImage"

export const getImages  = (_: Request, res: Response) => {
	const imagesLocal = fetchImages()
	res.send(imagesLocal)
}

export const getImage = (req: Request, res: Response) => {
	const id = req.params.id

	const image = fetchImage(id)

	// sprawdz czy obraz istnieje
	if (!image) {
		return res.status(404).send("Image not found")
	}

	res.send(image)
}

export const postImage = (req: Request, res: Response) => {
	try {
		let { sourceUrl } = req.body
		if (!sourceUrl) {
			return res.status(400).send("URL parameter is required")
		}
		try {
			sourceUrl = new URL(sourceUrl)
		} catch {
			return res.status(400).send("URL parameter must be a link")
		}

		const localImage: ImageType = {
			sourceUrl: sourceUrl,
			status: "queued",
			dateAdded: new Date(),
		}
		const id = addImage(localImage)

		res
			.status(201)
			.json(createResponse(`${address}/images/${id}`, "success", "201 Created"))
	} catch (error) {
		return res
			.status(500)
			.json(createResponse("Error", "error", "500 - Internal Server Error"))
	}
}

export const deleteImage  = (req: Request, res: Response) => {
	const id = req.params.id
	const status = removeImage(id)

	if(status) return res.status(200).json(createResponse(`The image with id ${id} has been removed!`, "success", "200 OK"))
	
	res.status(404).json(createResponse(`Unable to delete image with id ${id}.`, "error", "404 - Not Found"))
	
}
