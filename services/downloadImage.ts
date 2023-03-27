import axios from "axios"
import * as fs from "fs"

import { address } from ".."

import { ImageType } from "../models/ImageType"

import { updateImage } from "./database/updateImage"

import { getExtension } from "./getExtension"

export async function downloadImage(
	sourceUrl: URL,
	id: string,
	localImage: ImageType
): Promise<boolean> {
	const response = await axios.get(sourceUrl.href, { responseType: "stream" })
	const filenameSourceUrl = sourceUrl.pathname.split("/").at(-1)
	const extension = getExtension(filenameSourceUrl || "")

	const imagePath = `public/images/${id}.${extension}`
	const file = fs.createWriteStream(imagePath)
	response.data.pipe(
		file.on("finish", () => {
			localImage.url = new URL(`${address}/${imagePath.replace("public/", "")}`)
			localImage.dateDownloaded = new Date(fs.statSync(imagePath).mtime)
			localImage.status = "downloaded"

			updateImage(id, localImage)
		})
	)
	return true
}
