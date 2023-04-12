import { Request, Response } from "express"
import mongoose from "mongoose"

import { ObjectId } from "mongodb"
import { address } from ".."

import { ImageType } from "../models/ImageType"

import { CreateResponse } from "../helpers/responses/CreateResponse"

import { validatePostImage } from "../helpers/validators/validatePostImage"
import { ErrorResponse } from "../helpers/responses/ErrorResponse"
import { removeImage } from "../services/removeImage"
import { imageQueue } from "../services/bull/imageQueue"

const Image = require("../services/mongodb/models/imageModel")

export const getImages = async (_: Request, res: Response) => {
	try {
		const images = await Image.find()

		if(images.length === 0) return res.status(200).json(CreateResponse("No images found in the database", "success", "200 OK"))

		res.send(images)
	} catch (error) {
		return ErrorResponse(error, res)
	}
}

export const getImage = async (req: Request, res: Response) => {
	try {
		const id = req.params.id
		const image = await Image.findById(id)

		// Fix null returned from findById method for deleted image
		if (!image) throw null
		

		res.send({
			sourceUrl: image.sourceUrl,
			dateAdded: image.dateAdded,
			status: image.status,
			dateDownloaded: image.dateDownloaded,
			url: image.url,
		})
	} catch (error) {
		// The image doesn't exist or is null
		error instanceof mongoose.Error.CastError || !error
			? res
					.status(404)
					.json(CreateResponse("Image not found", "error", "404 - Not Found"))
			: ErrorResponse(error, res)
	}
}

export const postImage = async (req: Request, res: Response) => {
	// Error handling
	const errorResponse = validatePostImage(req)
	if (errorResponse) return res.status(400).json(errorResponse)

	try {
		const sourceUrl = new URL(req.body.sourceUrl)
		const id = new ObjectId()

		const localImage: ImageType = {
			_id: id,
			sourceUrl: sourceUrl,
			status: "queued",
			dateAdded: new Date(),
		}

		await Image.create(localImage)

		await imageQueue.add({
			id: id,
			imagePath: sourceUrl,
			localImage: localImage,
		})

		return res
			.status(201)
			.json(CreateResponse(`${address}/images/${id}`, "success", "201 Created"))
	} catch (error) {
		return ErrorResponse(error, res)
	}
}

export const deleteImage = async (req: Request, res: Response) => {
	try {
		const id = req.params.id

		const image = await Image.findById(id)
		
		// The image doesn't exist
		if(!image) throw null

		// The image is in the queue
		if (!image.url) return res.status(404).json(
					CreateResponse(
						`The image with id ${id} is in the queue.`,
						"error",
						"400 - Bad Request"
					)
				)
		

		removeImage(image.url)
		await image.deleteOne({ _id: id })

		return res
			.status(200)
			.json(
				CreateResponse(
					`The image with id ${id} has been removed!`,
					"success",
					"200 OK"
				)
			)
	} catch (error) {
		error instanceof mongoose.Error.CastError || !error
			? res
					.status(404)
					.json(CreateResponse("Image not found", "error", "404 - Not Found"))
			: ErrorResponse(error, res)
	}
}
