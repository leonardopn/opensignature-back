import express from "express";
import helmet from "helmet";
import cors from "cors";
import appRoutes from "./routes/app.routes";
import dayjs from "dayjs";

export async function startApi() {
    const api = express();

    //CORS POLICIES
    api.use(
        cors({
            credentials: true,
            origin: [process.env.FRONT_URL ?? "*"],
            optionsSuccessStatus: 200,
        })
    );

    //HELMET
    api.use(helmet());

    //PARSER x-www-form-urlencoded
    api.use(express.urlencoded({ extended: true }));
    api.use(express.json({ limit: 2e6 }));

    //LOAD ROUTES
    api.use(appRoutes);

    api.listen(process.env.PORT, () => {
        console.log(`(${dayjs().format("DD/MM/YYYY HH:mm:ss")}) - Servidor escutando na porta: ${process.env.PORT}`);
    });
}
