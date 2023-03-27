import { ImageType } from "../../models/ImageType"
import { mockImages } from "../../models/mockImages"

export const updateImage = (id: string, image: ImageType) => {
	mockImages[id] = image
	return true
}
