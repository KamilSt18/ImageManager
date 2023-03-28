import * as fs from "fs"

export const removeImage = (url: string): boolean => {
	const directoryPath = "public/images/"

    const fileName = url.split("/").at(-1)

	fs.unlinkSync(directoryPath + fileName)

	return true
}