import { Request } from "express"

import { CreateResponse } from "../responses/CreateResponse"
import { isFileImage } from "./isFileImage"
import { isValidUrl } from "./isValidUrl"

export function validatePostImage(req: Request) {
	let { sourceUrl } = req.body
	if (!sourceUrl) {
		return CreateResponse(
			"URL parameter is required",
			"error",
			"400 - Bad Request"
		)
	}

	sourceUrl = isValidUrl(sourceUrl)
	if (!isValidUrl(sourceUrl)) {
		return CreateResponse(
			"URL parameter must be a link",
			"error",
			"400 - Bad Request"
		)
	}

	if (!isFileImage(sourceUrl.href)) {
		return CreateResponse(
			"Link doesn't point to image.",
			"error",
			"400 - Bad Request"
		)
	}
	
	return null
}
