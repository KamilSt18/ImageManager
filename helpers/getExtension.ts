export function getExtension(url: string) {
	const filenameUrl = url.split("/").at(-1)
	return filenameUrl?.split(".").at(-1)
}
