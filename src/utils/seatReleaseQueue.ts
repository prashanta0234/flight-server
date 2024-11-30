import { Queue, Worker, QueueEvents } from "bullmq";
import { SeatModel } from "../modules/flight/models/flights.model";

const redisConnection = {
	host: "redis-18898.c14.us-east-1-3.ec2.redns.redis-cloud.com",
	port: 18898,
	password: "EEYPtEUQ0lwVrBE3wc3HvOaIiWwlO0nR",
};

const seatReleaseQueue = new Queue("seat-release", {
	connection: redisConnection,
	defaultJobOptions: {
		removeOnComplete: true,
		removeOnFail: 10,
	},
});

const seatReleaseWorker = new Worker(
	"seat-release",
	async (job) => {
		const { seatIds, userId } = job.data;
		console.log("start workers");

		try {
			const expiredSeats = await SeatModel.updateMany(
				{
					_id: { $in: seatIds },
					bookedBy: userId,
					reservedAt: { $lt: new Date(Date.now() - 2 * 60 * 1000) },
				},
				{
					$set: {
						isBooked: false,
						bookedBy: null,
						reservedAt: null,
					},
				}
			);

			if (expiredSeats.matchedCount > 0) {
				console.log(
					`Released ${expiredSeats.matchedCount} expired seats for user ${userId}`
				);
			}
		} catch (error) {
			console.error(`Error processing seat release for user ${userId}:`, error);
			throw error;
		}
	},
	{
		connection: redisConnection,
	}
);

const queueEvents = new QueueEvents("seat-release", {
	connection: redisConnection,
});

queueEvents.on("completed", ({ jobId }) => {
	console.log(`Job ${jobId} completed successfully.`);
});

queueEvents.on("failed", ({ jobId, failedReason }) => {
	console.error(`Job ${jobId} failed with reason: ${failedReason}`);
});

export { seatReleaseQueue, seatReleaseWorker, queueEvents };
