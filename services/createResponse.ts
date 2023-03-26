import { ApiResponse, CodeType, StatusType } from "../models/ApiResponse";

export const createResponse = (message: string, status: StatusType, code: CodeType = "200 OK"): ApiResponse => ({
	message: message,
	status: status,
	code: code,
})
