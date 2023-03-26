type statusType = "queued" | "downloaded"

export interface ImageType {
	sourceUrl: URL
	status: statusType
	dateAdded: Date
	dateDownloaded?: Date
	url?: URL
}
