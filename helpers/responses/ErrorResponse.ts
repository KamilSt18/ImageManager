import { Response } from "express"
import { CreateResponse } from "./CreateResponse"

export function ErrorResponse(
	error: unknown,
	res: Response<any, Record<string, any>>
) {
	console.log(error)
	return res
		.status(500)
		.json(CreateResponse("Error", "error", "500 - Internal Server Error"))
}
