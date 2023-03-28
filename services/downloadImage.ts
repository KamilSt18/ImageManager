import axios from "axios"
import * as fs from "fs"
import Queue from "bull"

import { ObjectId } from "mongodb"

import { address } from ".."

import { ImageType } from "../models/ImageType"

import { getExtension } from "../helpers/getExtension"

export async function downloadImage(
	sourceUrl: URL,
	id: ObjectId,
	localImage: ImageType
): Promise<boolean> {
	const Image = require("../db/models/imageModel")

	const response = await axios.get(sourceUrl.href, { responseType: "stream" })
	const filenameSourceUrl = sourceUrl.pathname.split("/").at(-1)
	const extension = getExtension(filenameSourceUrl || "")
	
	const imagePath = `public/images/${id}.${extension}`
	const file = fs.createWriteStream(imagePath)
	response.data.pipe(
		file.on("finish", async () => {
			localImage.url = new URL(`${address}/${imagePath.replace("public/", "")}`)
			localImage.dateDownloaded = new Date(fs.statSync(imagePath).mtime)
			localImage.status = "downloaded"

			// Update the image in the database
			await Image.findByIdAndUpdate(id, localImage)
		})
	)
	return true
}
