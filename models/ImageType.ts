import {ObjectId} from 'mongodb'

type statusType = "queued" | "downloaded"

export interface ImageType {
	_id: ObjectId
	sourceUrl: URL
	status: statusType
	dateAdded: Date
	dateDownloaded?: Date
	url?: URL
}
