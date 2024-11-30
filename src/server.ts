import express, { Express, Request, Response } from "express";
import { config } from "./utils/config";
import { connectDB } from "./utils/dbConnection";
import { GlobalErrorHandler } from "./middleware/global-error-validation";
import { AppRouter } from "./modules/app.routes";
import { seatReleaseWorker } from "./utils/seatReleaseQueue";

const app: Express = express();
app.use(express.json());

const port = config.PORT;

app.use("/api", AppRouter);

app.get("/", (req: Request, res: Response) => {
	res.send("Hello from Doctors server!");
});

seatReleaseWorker;

app.use(GlobalErrorHandler);

connectDB().then(() => {
	app.listen(port, () => {
		console.log(`Server is running at ${port}`);
	});
});
