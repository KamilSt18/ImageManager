import { ApiResponse, CodeType, StatusType } from "../../models/ApiResponse"

export const CreateResponse = (
	message: string,
	status: StatusType,
	code: CodeType = "200 OK"
): ApiResponse => ({
	message: message,
	status: status,
	code: code,
})
