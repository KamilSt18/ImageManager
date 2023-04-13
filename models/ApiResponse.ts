export type StatusType = "success" | "error"

export type CodeType =
	| "200 OK"
	| "201 Created"
	| "202 Accepted"
	| "204 - No Content"
	| "301 Moved Permanently"
	| "302 - Found"
	| "304 - Not Modified"
	| "400 - Bad Request"
	| "401 - Unauthorized"
	| "403 - Forbidden"
	| "404 - Not Found"
	| "429 - Too Many Requests"
	| "500 - Internal Server Error"
	| "503 - Service Unavailabled"


export interface ApiResponse {
	message: string
	status: StatusType
	code?: CodeType
}
