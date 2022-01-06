import fs from "fs";
import path from "path";
import { PDFDocument, PDFImage, PDFPage } from "pdf-lib";
import { fromPath } from "pdf2pic";
import { Options } from "pdf2pic/dist/types/options";
import { pxToPoint } from "../helper/calc";
import { getPathAssets, getPathTemp } from "./fs.service";

type elementToPdf = {
    x: number;
    y: number;
    type: string;
    content: string;
};

export const sign = async (elements: elementToPdf[]) => {
    const pdfDoc = await PDFDocument.load(fs.readFileSync(path.join(getPathTemp(), "teste.pdf")));
    const imagePage = await pdfDoc.getPage(0);

    await addElementsInPdf(pdfDoc, imagePage, elements);

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(path.join(getPathAssets(), "result.pdf"), pdfBytes);
};

async function addElementsInPdf(pdf: PDFDocument, page: PDFPage, elements: elementToPdf[]) {
    const now = new Date();
    for (const element of elements) {
        switch (element.type) {
            case "DATE":
                break;
            case "DATE_DAY":
                page.drawText(now.getDate().toString(), {
                    x: pxToPoint(element.x),
                    y: Math.abs(pxToPoint(element.y) - page.getHeight()),
                    size: 12,
                    rotate: page.getRotation(),
                });
                break;
            case "DATE_MONTH":
                page.drawText((now.getMonth() + 1).toString(), {
                    x: pxToPoint(element.x),
                    y: Math.abs(pxToPoint(element.y) - page.getHeight()),
                    size: 12,
                    rotate: page.getRotation(),
                });
                break;
            case "DATE_YEAR":
                page.drawText(now.getFullYear().toString(), {
                    x: pxToPoint(element.x),
                    y: Math.abs(pxToPoint(element.y) - page.getHeight()),
                    size: 12,
                    rotate: page.getRotation(),
                });
                break;
            default:
                //SIGN E INITIAL
                page.drawImage(await pdf.embedPng(fs.readFileSync(element.content)), {
                    x: pxToPoint(element.x),
                    y: Math.abs(pxToPoint(element.y) - page.getHeight()),
                    width: 100,
                    height: 30,
                    rotate: page.getRotation(),
                });
                break;
        }
    }
}

export async function pdfToPng(pdfPath: string, name: string) {
    const pdfDoc = await PDFDocument.load(fs.readFileSync(pdfPath));
    const imagePage = await pdfDoc.getPage(0);

    const options: Options = {
        quality: 100,
        density: 100,
        saveFilename: name,
        savePath: getPathTemp(),
        format: "png",
        compression: "none",
        width: imagePage.getWidth() * 1.3333333333333333,
        height: imagePage.getHeight() * 1.3333333333333333,
    };

    const convertedPdf = await fromPath(pdfPath, options);
    await convertedPdf(1);
}
