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

	res.json(result);
});

router.post('/create', verifyToken, upload.none(), async (req, res) => {
	const { title, date, subject } = req.body as {
		title: string | undefined;
		date: number | undefined;
		subject: number | undefined;
	};

	if (title == undefined || date == undefined || subject == undefined) {
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
			subjectObject.subjectID
		)
	);

	if (typeof result == 'string') {
		return res.sendStatus(409);
	}

	res.json({ entryID: result });
});

router.put('/update', verifyToken, upload.none(), async (req, res) => {
	const { title, id, date, subjectID, content } = req.body as {
		id: number | undefined;
		title: string | undefined;
		date: Date | undefined;
		subjectID: number | undefined;
		content: string | undefined;
	};

	if (
		title === undefined ||
		id === undefined ||
		date === undefined ||
		subjectID === undefined ||
		content === undefined
	) {
		return res.status(400).send('Invalid Body');
	}

	const result = await EntryDao.updateEntry(
		id,
		subjectID,
		title,
		dateToDateString(date),
		content
	);

	if (result !== 'worked') {
		return res.sendStatus(409);
	}

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
