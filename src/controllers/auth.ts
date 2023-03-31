import { Router } from 'express';
import multer from 'multer';
import { comparePasswords } from '../util/hash';

export const router = Router();
const upload = multer();

const users: { [key: string]: string } = {};

router.post('/login', upload.none(), async (req, res) => {
	const { username, password } = req.body as { username: string; password: string };

	if (username == null || password == null) {
		res.status(400).send('Invalid Body');
	}

	if (!users[username]) {
		res.status(404).send('User not found');
	}

	if (!comparePasswords(password, users[username])) {
		res.status(400).send("Password doesn't match username");
	}

	res.send('ok');
});
