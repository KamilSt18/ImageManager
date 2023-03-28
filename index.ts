import dotenv from "dotenv"
dotenv.config()
import express, { Express } from "express"
import worker from './workers/worker';

import { router as imagesRoutes } from "./routes/imagesRoute"

const mongodb = require('./services/mongodb/config/mongodb')
const redisClient = require('./services/redis/config/redis')

mongodb();

(async () => {
    await redisClient.connect();
})();

// Starting a worker
worker.start();

const app: Express = express()
const port: string = process.env.PORT || "8000"
export const address: string = `http://localhost:${port}`

app.use(express.json())
app.use('/', express.static('public'))

app.use("/images", imagesRoutes)

app.listen(port, () => {
	console.log(`[Express]: Server is running at ${address}`)
})
