import dayjs from "dayjs";
import fs from "fs";
import path from "path";

const pathTemp = path.join(__dirname, "..", "temp");

export function createFsTree() {
    if (!fs.existsSync(pathTemp)) {
        fs.mkdirSync(pathTemp);
        console.log(`(${dayjs().format("DD/MM/YYYY HH:mm:ss")}) - Criando diretório temporário: ${pathTemp}`);
    }
    console.log(`(${dayjs().format("DD/MM/YYYY HH:mm:ss")}) - Carregando diretório temporário`);
}

export function getPathTemp() {
    return pathTemp;
}
