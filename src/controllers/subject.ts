import { Router } from "express";
import multer from "multer";
import * as SubjectDao from "../model/subjectDao";
import { Subject } from "./../model/Subject";
import { verifyToken } from "../util/jwt";

export const router = Router();

const upload = multer();

router.get("/list", verifyToken, async (req, res) => {
  const result = await SubjectDao.selectAll();

  if (typeof result == "string") {
    return res.sendStatus(409);
  }

  res.json(result);
});

router.get("/get", verifyToken, async (req, res) => {
  const { id } = req.query;

  if (id == undefined) {
    return res.status(400).send("Invalid Body");
  }

  const result = await SubjectDao.selectEntity(Number(id));

  if (typeof result == "string") {
    return res.sendStatus(409);
  }

  res.json(result);
});

router.post("/create", verifyToken, upload.none(), async (req, res) => {
  const { name } = req.body as {
    name: string | undefined;
  };

  if (name == undefined) {
    return res.status(400).send("Invalid Body");
  }

  const result = await SubjectDao.insertSubject(new Subject(name));

  if (typeof result == "string") {
    return res.sendStatus(409);
  }

  res.json(result);
});

router.put("/update", verifyToken, upload.none(), async (req, res) => {
  const { name, id } = req.body as {
    id: number | undefined;
    name: string | undefined;
  };

  if (name === undefined || id === undefined) {
    return res.status(400).send("Invalid Body");
  }

  const result = await SubjectDao.updateSubject(id, name);

  if (result !== "worked") {
    return res.sendStatus(409);
  }

  res.sendStatus(200);
});

router.delete("/delete", verifyToken, async (req, res) => {
  const { id } = req.query as {
    id: number | undefined;
  };

  if (id === undefined) {
    return res.status(400).send("Invalid Body");
  }

  const result = await SubjectDao.deleteSubject(id);

  if (result !== "worked") {
    return res.sendStatus(409);
  }

  res.sendStatus(200);
});
