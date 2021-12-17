import fs from "fs";
import path from "path";
import { PDFDocument } from "pdf-lib";
import { fromPath } from "pdf2pic";
import { Options } from "pdf2pic/dist/types/options";
import { pxToPoint } from "../helper/calc";
import { getPathTemp } from './fs.service';

const pdfPath = path.join(__dirname, "assets", "teste.pdf");
const signaturePath = path.join(__dirname, "assets", "assinatura.png");

const run = async (pathToPDF: string, pathToImage: string) => {
    const pdfDoc = await PDFDocument.load(fs.readFileSync(pathToPDF));
    const img = await pdfDoc.embedPng(fs.readFileSync(pathToImage));
    const imagePage = await pdfDoc.getPage(0);
    console.log(imagePage.getRotation());

    const x = 72.01754252115886;
    const y = 471.50583902994794;

    imagePage.drawImage(img, {
        x: pxToPoint(x), //288.66541181291853,
        y: Math.abs(pxToPoint(y) - imagePage.getHeight()),
        width: 100,
        height: 30,
        rotate: imagePage.getRotation(),
    });

    const options = {
        density: 100,
        saveFilename: "untitled",
        savePath: path.join(__dirname, "assets"),
        format: "png",
        width: imagePage.getWidth() * 1.3333333333333333,
        height: imagePage.getHeight() * 1.3333333333333333,
    };
    const storeAsImage = fromPath(pdfPath, options);
    const pageToConvertAsImage = 1;

    storeAsImage(pageToConvertAsImage).then((resolve) => {
        return resolve;
    });

    console.log(imagePage.getSize());
    console.log(pxToPoint(x));
    console.log(Math.abs(pxToPoint(y) - imagePage.getHeight()));

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(path.join(__dirname, "assets", "result.pdf"), pdfBytes);
};

export async function pdfToPng(pdfPath: string, name: string) {
    const pdfDoc = await PDFDocument.load(fs.readFileSync(pdfPath));
    const imagePage = await pdfDoc.getPage(0);

    const options: Options = {
        density: 100,
        saveFilename: name,
        savePath: getPathTemp(),
        format: "png",
        width: imagePage.getWidth() * 1.3333333333333333,
        height: imagePage.getHeight() * 1.3333333333333333,
    };

    const convertedPdf = await fromPath(pdfPath, options);
    await convertedPdf(1);
}
