import { Request, Response } from "express"

import { address } from ".."

import { ImageType } from "../models/ImageType"

import { createResponse } from "../services/createResponse"
import { downloadImage } from "../services/downloadImage"
import { isValidUrl } from "../services/validators/isValidUrl"
import { isFileImage } from "../services/validators/isFileImage"

import { ObjectId } from "mongodb"

const Image = require("../db/models/imageModel")

export const getImages = async (_: Request, res: Response) => {
	const images = await Image.find()
	res.send(images)
}

export const getImage = async (req: Request, res: Response) => {
	const id = req.params.id

	const image = await Image.findById(id)

	// Check that the image exists
	if (!image) {
		return res
			.status(404)
			.json(createResponse("Image not found", "error", "404 - Not Found"))
	}

	res.send(image)
}

export const postImage = async (req: Request, res: Response) => {
	try {
		let { sourceUrl } = req.body
		if (!sourceUrl) {
			return res
				.status(400)
				.json(
					createResponse(
						"URL parameter is required",
						"error",
						"400 - Bad Request"
					)
				)
		}

		sourceUrl = isValidUrl(sourceUrl)
		if (!isValidUrl(sourceUrl))
			return res
				.status(400)
				.json(
					createResponse(
						"URL parameter must be a link",
						"error",
						"400 - Bad Request"
					)
				)
		if (!isFileImage(sourceUrl.href))
			return res
				.status(400)
				.json(
					createResponse(
						"Link doesn't point to image.",
						"error",
						"400 - Bad Request"
					)
				)

		const id = new ObjectId()

		const localImage: ImageType = {
			_id: id,
			sourceUrl: sourceUrl,
			status: "queued",
			dateAdded: new Date(),
		}

		await Image.create(localImage)

		await downloadImage(sourceUrl, id, localImage)
		
		res
			.status(201)
			.json(createResponse(`${address}/images/${id}`, "success", "201 Created"))
	} catch (error) {
		console.log(error)
		return res
			.status(500)
			.json(createResponse("Error", "error", "500 - Internal Server Error"))
	}
}

export const deleteImage = async (req: Request, res: Response) => {
	try {
		const id = req.params.id

		const image = await Image.findById(id)

		if (!image) {
			return res
				.status(404)
				.json(
					createResponse(
						`Unable to delete image with id ${id}.`,
						"error",
						"404 - Not Found"
					)
				)
		}

		await image.deleteOne({ _id: id })

		return res
			.status(200)
			.json(
				createResponse(
					`The image with id ${id} has been removed!`,
					"success",
					"200 OK"
				)
			)
	} catch (error) {
		console.log(error)
		return res
			.status(500)
			.json(createResponse("Error", "error", "500 - Internal Server Error"))
	}
}
