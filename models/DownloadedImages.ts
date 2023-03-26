import { ImageType } from "./ImageType"

// Obiekt przechowujący informacje o pobranych obrazkach
export interface DownloadedImages {
	[key: string]: ImageType
}
