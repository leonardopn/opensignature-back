import dayjs from "dayjs";
import { Router } from "express";

const route = Router();

route.get("/", (req, res) => {
    res.json({ app: "Opensignature", version: "1.0.0", date: dayjs().format("DD/MM/YYYY - HH:mm:ss") });
});

export default route;
