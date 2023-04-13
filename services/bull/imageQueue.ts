import Queue from "bull"

export const imageQueue = new Queue("image", {
	redis: {
		host: process.env.REDIS_HOST,
		port: Number(process.env.REDIS_PORT),
		password: process.env.REDIS_PASSWORD,
	},
})
