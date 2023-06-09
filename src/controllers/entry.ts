import { Router } from 'express';
import multer from 'multer';
import * as EntryDao from '../model/entryDao';
import * as SubjectDao from '../model/subjectDao';
import { Entry } from '../model/Entry';
import { Subject } from './../model/Subject';
import { verifyToken } from '../util/jwt';
import { dateToDateString } from '../util/date';

export const router = Router();

const upload = multer();

router.get('/list', verifyToken, async (req, res) => {
	const result = await EntryDao.selectAll();

	if (typeof result == 'string') {
		return res.sendStatus(409);
	}

	res.json(result);
});

router.get('/get', verifyToken, async (req, res) => {
	const { id } = req.query;

	if (id == undefined) {
		return res.status(400).send('Invalid Body');
	}

	const result = await EntryDao.selectEntity(Number(id));

	if (typeof result == 'string') {
		return res.sendStatus(409);
	}

	console.log(result);

	res.json(result);
});

router.post('/create', verifyToken, upload.none(), async (req, res) => {
	const { title, date, subject, userID } = req.body as {
		title: string | undefined;
		date: number | undefined;
		subject: number | undefined;
		userID: number | undefined;
	};

	console.log(date);

	if (
		title == undefined ||
		date == undefined ||
		subject == undefined ||
		userID == undefined
	) {
		return res.status(400).send('Invalid Body');
	}

	const subjectObject = <{ subjectID: 2; name: string }>(
		await SubjectDao.selectEntity(subject)
	);

	const result = await EntryDao.insertEntry(
		new Entry(
			title,
			dateToDateString(new Date(date)),
			'',
			subjectObject.subjectID,
			userID
		)
	);

	if (typeof result == 'string') {
		return res.sendStatus(409);
	}

	res.json({ entryID: result });
});

router.put('/update', verifyToken, upload.none(), async (req, res) => {
	const { title, id, date, subjectID, content, userID } = req.body as {
		id: number | undefined;
		title: string | undefined;
		date: string | undefined;
		subjectID: number | undefined;
		content: string | undefined;
		userID: number | undefined;
	};

	if (
		title === undefined ||
		id === undefined ||
		date === undefined ||
		subjectID === undefined ||
		content === undefined ||
		userID == undefined
	) {
		return res.status(400).send('Invalid Body');
	}

	const result = await EntryDao.updateEntry(
		Number(id),
		Number(subjectID),
		title,
		date,
		content,
		Number(userID)
	);

	console.log(result, {
		id,
		subjectID,
		title,
		date,
		content,
		userID,
	});

	if (result !== 'worked') {
		return res.sendStatus(409);
	}

	const r = await EntryDao.selectEntity(Number(id));

	console.log(r);

	res.sendStatus(200);
});

router.delete('/delete', verifyToken, upload.none(), async (req, res) => {
	const { id } = req.body as {
		id: number | undefined;
	};

	if (id === undefined) {
		return res.status(400).send('Invalid Body');
	}

	const result = await EntryDao.deleteEntry(id);

	if (result !== 'worked') {
		return res.sendStatus(409);
	}

	res.sendStatus(200);
});
