import * as fs from "fs"

import { mockImages } from "../../models/mockImages"

import { getExtension } from "../getExtension"

export const removeImage = (id: string): boolean => {
	const directoryPath = "public/images/"

	const index = Object.keys(mockImages).indexOf(id)

	if (index === -1) return false

	const extension = getExtension(mockImages[id].sourceUrl.pathname)

	fs.unlinkSync(directoryPath + `${id}.${extension}`)
	delete mockImages[id]

	return true
}
