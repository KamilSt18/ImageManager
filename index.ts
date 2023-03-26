import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import { createResponse } from "./services/createResponse"
import { router as imagesRoutes } from "./routes/imagesRoute"

dotenv.config()

const app: Express = express()
const port: string = process.env.PORT || "8000"
export const address: string = `http://localhost:${port}`

app.use(express.json())

app.use("/images", imagesRoutes)

app.listen(port, () => {
	console.log(`[Express]: Server is running at ${address}`)
})
