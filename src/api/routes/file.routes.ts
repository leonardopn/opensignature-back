import dayjs from "dayjs";
import { Router } from "express";
import { saveFile } from "../../service/fs.service";
import { v4 as uuidv4 } from "uuid";

const route = Router();

route.post("/upload", async (req, res) => {
    const file = req.file;

    if (!file) {
        res.status(400).send({ error: "Nenhum arquivo foi enviado!" });
    } else {
        await saveFile(file.buffer, uuidv4() + " - " + file.originalname);
        res.send("Arquivo salvo com sucesso!");
    }
});

export default route;
