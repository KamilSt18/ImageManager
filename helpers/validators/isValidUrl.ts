export const isValidUrl = (url: string | URL): URL | boolean => {
	try {
		url = new URL(url)
	} catch {
		return false
	}
	return url
}
