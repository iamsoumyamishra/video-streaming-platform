import "dotenv/config";

import express from 'express';
import auth from './routes/auth.ts';
import connectToDB from "./lib/db.ts";
import Logger from "./middlewares/logger.ts";



const app = express();
const port = Number(process.env.PORT) || 8080;
export const jwt_secret_key = process.env.SECRET_KEY || "secret_key"

await connectToDB()

app.use(Logger)
app.use(express.json())
app.use("/auth", auth)


app.listen(port,'0.0.0.0', () => {
    console.log(`Server is listening on port ${port}`);
})

