import { Router } from "express";
import path from "path";
import { getPathAssets } from "../../service/fs.service";
import { sign } from "../../service/pdf.service";

const route = Router();

type element = {
    id: string;
    type: string;
    position: { x: number; y: number };
    positionInitial: { x: number; y: number };
};

type elementToPdf = {
    x: number;
    y: number;
    type: string;
    content: string;
};

route.post("/mark-to-sign", async (req, res, next) => {
    const elements: elementToPdf[] = req.body.map((e: element) => {
        switch (e.type) {
            case "SIGN":
                return {
                    x: e.positionInitial.x,
                    y: e.positionInitial.y,
                    type: e.type,
                    content: path.join(getPathAssets(), "assinatura.png"),
                };
            case "INITIAL":
                return {
                    x: e.positionInitial.x,
                    y: e.positionInitial.y,
                    type: e.type,
                    content: path.join(getPathAssets(), "rubrica.png"),
                };
            default:
                return { x: e.positionInitial.x, y: e.positionInitial.y, type: e.type, content: null };
        }
    });

    sign(elements);
    res.send("OK");
});

export default route;
