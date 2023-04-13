import express from "express";
import { router as api } from "./controllers/api";
import { router as view } from "./controllers/view";
import { join } from "path";
import logger from "morgan";
import compression from "compression";
import { create } from "express-handlebars";

import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT ?? 3000;

const PUBLIC_FOLDER = join(process.cwd(), "src", "public");

const VIEWS_FOLDER = join(process.cwd(), "src", "views");

const TINYMCE = join(process.cwd(), "node_modules", "tinymce");

const app = express();

app.use(logger(process.env.MODE === "production" ? "combined" : "dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.MODE === "production") {
  app.use(compression());
}

const hbs = create({});

app.engine("handlebars", hbs.engine);

app.set("view engine", "handlebars");

app.set("views", VIEWS_FOLDER);

if (process.env.MODE == "production") {
  app.enable("view cache");
}

app.use("/api", api);

app.use("/tinymce", express.static(TINYMCE));

app.use(express.static(PUBLIC_FOLDER));

app.use(view);

export const server = app.listen(PORT, () => {
  console.log("> Server running on http://127.0.0.1:3000/");
});
