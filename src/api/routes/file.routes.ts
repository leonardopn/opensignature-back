import dayjs from "dayjs";
import { Router } from "express";
import { bufferToBase64, getPathTemp, saveFile } from "../../service/fs.service";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { pdfToPng } from "../../service/pdf.service";
import fs from "fs";

const route = Router();

route.post("/upload", async (req, res, next) => {
    const file = req.file;

    if (!file) {
        res.status(400).send({ error: "Nenhum arquivo foi enviado!" });
    } else {
        const id = uuidv4();
        const fileName = id + path.extname(file.originalname);

        await saveFile(file.buffer, fileName);
        await pdfToPng(path.join(getPathTemp(), fileName), id);
        const base64 = bufferToBase64(fs.readFileSync(path.join(getPathTemp(), id + ".1.png")));
        res.json({ image: base64 });
    }
});

export default route;
