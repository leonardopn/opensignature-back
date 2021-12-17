import { config } from "dotenv";
import { startApi } from "./api/app";
config();

startApi();
