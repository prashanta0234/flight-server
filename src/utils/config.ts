import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const config = {
	DB_URI: process.env.DB_URI!,
	PORT: process.env.PORT || "5000",
	JWT_SECRET: process.env.JWT_SECRET,
};
