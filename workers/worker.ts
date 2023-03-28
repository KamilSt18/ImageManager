import { downloadImage } from "../services/downloadImage"
import { imageQueue } from "../services/bull/imageQueue"

imageQueue.process(async job => {
	const { id, imagePath, localImage } = job.data

	const sourceUrl = new URL(imagePath)

	await downloadImage(sourceUrl, id, localImage)
})

// Starting function
function start() {
	console.log("[bull] Worker imageQueue started!")

	// Error handling
	imageQueue.on("error", error => {
		console.error(error)
		process.exit(1)
	})
}

export default { start }
