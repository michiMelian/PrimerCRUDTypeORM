import express from "express";
import * as dotenv from "dotenv";
import user from "./src/routes/user.js";
import cors from "cors";
import { createConnection } from "typeorm";
dotenv.config();

const app = express();
app.use(cors({}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", user);

export const db = createConnection({
  type: "postgres",
  host: process.env.HOSTDB,
  port: parseInt(process.env.PORTDB),
  username: process.env.USUARIOBD,
  password: process.env.PASSWORDDB,
  database: process.env.DATABASEDB,
  entities: ["src/entity/*.js"],
  synchronize: true,
});

app.listen(parseInt(process.env.PORT), () => {
  console.log(
    `La aplicacion esta lista aqui => http://localhost:${parseInt(
      process.env.PORT
    )}`
  );
});
