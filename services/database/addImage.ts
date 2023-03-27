import { ImageType } from "../../models/ImageType"
import { mockImages } from "../../models/mockImages"

export const addImage = (image: ImageType): string => {
	const id = crypto.randomUUID()
	mockImages[id] = image
	return id
}
