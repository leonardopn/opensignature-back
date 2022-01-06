import dayjs from "dayjs";
import fs from "fs";
import path from "path";

const pathTemp = path.join(__dirname, "..", "temp");
const pathAssets = path.join(__dirname, "..", "assets");

export function createFsTree() {
    if (!fs.existsSync(pathTemp)) {
        fs.mkdirSync(pathTemp);
        console.log(`(${dayjs().format("DD/MM/YYYY HH:mm:ss")}) - Criando diretório temporário: ${pathTemp}`);
    }
    console.log(`(${dayjs().format("DD/MM/YYYY HH:mm:ss")}) - Carregando diretório temporário`);
}

export async function saveFile(buffer: Buffer, fileName: string) {
    fs.writeFileSync(path.join(pathTemp, fileName), buffer);
    console.log(`(${dayjs().format("DD/MM/YYYY HH:mm:ss")}) - Arquivo salvo: ${fileName}`);
}

export function getPathTemp() {
    return pathTemp;
}
export function getPathAssets() {
    return pathAssets;
}

export function clearPathTemp() {
    fs.readdirSync(pathTemp).forEach((file) => {
        fs.unlinkSync(path.join(pathTemp, file));
    });
    console.log(`(${dayjs().format("DD/MM/YYYY HH:mm:ss")}) - Diretório temporário limpo`);
}

export function bufferToBase64(buffer: Buffer) {
    return buffer.toString("base64");
}

createFsTree();
clearPathTemp();
