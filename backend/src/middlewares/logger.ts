import type { NextFunction, Request, Response } from "express";
import { appendFile } from "node:fs/promises";


export default async function Logger (req: Request, res: Response, next: NextFunction) {

    
    try {
        let time = new Date();
        let log = `${req.method} - ${req.ip} - ${req.url} - ${time.toLocaleDateString()}`;
        appendFile('log.txt', log + '\n')
        .then(() => console.log(log));
        
    } catch (err) {
        console.log(err)
    }

    next();

}