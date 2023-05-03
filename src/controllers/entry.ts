import { Router } from "express";
import multer from "multer";
import * as EntryDao from "../model/entryDao";
import * as SubjectDao from "../model/subjectDao";
import { Entry } from "../model/Entry";
import { Subject } from "./../model/Subject";
import { verifyToken } from "../util/jwt";

export const router = Router();

const upload = multer();

router.get("/list", verifyToken, async (req, res) => {
  const result = await EntryDao.selectAll();

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

  const result = await EntryDao.selectEntity(Number(id));

  if (typeof result == "string") {
    return res.sendStatus(409);
  }

  res.json(result);
});

router.post("/create", verifyToken, upload.none(), async (req, res) => {
  const { title, date, subject } = req.body as {
    title: string | undefined;
    date: number | undefined;
    subject: number | undefined;
  };

  if (title == undefined || date == undefined || subject == undefined) {
    return res.status(400).send("Invalid Body");
  }

  const subjectObject = <Subject>await SubjectDao.selectEntity(subject);

  const s = new Subject(subjectObject.name);

  s.setSubjectID(subjectObject.subjectID);

  console.log(subjectObject);

  const result = await EntryDao.insertEntry(
    new Entry(title, new Date(date), "", s)
  );
  console.log(result);

  if (typeof result == "string") {
    return res.sendStatus(409);
  }

  res.sendStatus(200);
});

router.put("/update", verifyToken, upload.none(), async (req, res) => {
  const {
    title,
    id,
    date,
    subject: subjectID,
    content,
  } = req.body as {
    id: number | undefined;
    title: string | undefined;
    date: Date | undefined;
    subject: number | undefined;
    content: string | undefined;
  };

  if (
    title === undefined ||
    id === undefined ||
    date === undefined ||
    subjectID === undefined ||
    content === undefined
  ) {
    return res.status(400).send("Invalid Body");
  }

  const result = await EntryDao.updateEntry(
    id,
    subjectID,
    title,
    date,
    content
  );

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

  const result = await EntryDao.deleteEntry(id);

  if (result !== "worked") {
    return res.sendStatus(409);
  }

  res.sendStatus(200);
});
