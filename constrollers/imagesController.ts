import { Request, Response } from "express"
import { createResponse } from "../services/createResponse"
import { address } from ".."
import { addImage } from "../services/addImage"
import { ImageType } from "../models/ImageType"

export const postImages = (req: Request, res: Response) => {
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
