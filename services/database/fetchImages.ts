import { DownloadedImages } from "../../models/DownloadedImages"
import { mockImages } from "../../models/mockImages"

export const fetchImages = (): DownloadedImages => {
	return mockImages
}
