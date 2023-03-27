import { ImageType } from "../../models/ImageType"
import { mockImages } from "../../models/mockImages"

export const fetchImage = (id: string): ImageType => {
	return mockImages[id]
}
