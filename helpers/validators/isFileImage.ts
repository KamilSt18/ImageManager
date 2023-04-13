import { getExtension } from "../getExtension"

export function isFileImage(filename: string) {
	const acceptedImageTypes = ["jpg", "jpeg", "png"]

	// Remove params after ?
	filename = filename.replace(/\?.*/, "")

	const extension = getExtension(filename)

	return filename && acceptedImageTypes.includes(extension || "")
}
