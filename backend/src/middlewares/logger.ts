import type { NextFunction, Request, Response } from "express";


export default async function Logger (req: Request, res: Response, next: NextFunction) {

    console.log(`${req.method} - ${req.ip} - ${req.url}`);

    next();

}