import fs from "fs";
import path from "path";
import { degrees, PDFDocument } from "pdf-lib";

const pdfPath = path.join(__dirname, "assets", "teste2.pdf");
const signaturePath = path.join(__dirname, "assets", "assinatura.png");

const run = async (pathToPDF: string, pathToImage: string) => {
    const pdfDoc = await PDFDocument.load(fs.readFileSync(pathToPDF));
    const img = await pdfDoc.embedPng(fs.readFileSync(pathToImage));
    const imagePage = pdfDoc.getPage(0);
    console.log(imagePage.getRotation());

    imagePage.drawImage(img, {
        x: 100,
        y: imagePage.getHeight() - 735,
        width: 100,
        height: 30,
        rotate: imagePage.getRotation(),
    });

    console.log(imagePage.getWidth());
    console.log(imagePage.getHeight());
    console.log(imagePage.getSize());

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(path.join(__dirname, "assets", "result.pdf"), pdfBytes);
};

run(pdfPath, signaturePath);
