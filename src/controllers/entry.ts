import { Router } from "express";
import multer from "multer";
import * as EntryDao from "../model/entryDao";
import * as SubjectDao from "../model/subjectDao";
import { Entry } from "../model/Entry";
import { Subject } from "./../model/Subject";

export const router = Router();

const upload = multer();

router.post("/create", upload.none(), async (req, res) => {
  const { title, date, subject } = req.body as {
    title: string | undefined;
    date: Date | undefined;
    subject: number | undefined;
  };

  if (title == undefined || date == undefined || subject == undefined) {
    return res.status(400).send("Invalid Body");
  }

  const subjectObject = <Subject>await SubjectDao.selectEntity(subject);

  const result = await EntryDao.insertEntry(
    new Entry(title, date, "", subjectObject)
  );

  if (typeof result == "string") {
    return res.sendStatus(409);
  }

  res.sendStatus(200);
});
