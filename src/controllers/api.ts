import { Router } from "express";

import { router as auth } from "./auth";
import { router as subject } from "./subject";
import { router as entry } from "./entry";

export const router = Router();

router.use("/auth", auth);

router.use("/subject", subject);

router.use("/entry", entry);
