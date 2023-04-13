import { Router } from "express";

import { router as auth } from "./auth";
import { router as subject } from "./subject";

export const router = Router();

router.use("/auth", auth);

router.use("/subject", subject);

router.get("/name", (req, res) => {
  res.send({ status: "ok" });
});
