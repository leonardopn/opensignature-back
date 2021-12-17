import { config } from "dotenv";
import { startApi } from "./api/app";
import { createFsTree } from "./service/fs.service";
config();

createFsTree()
startApi();
