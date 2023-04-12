import { Router } from 'express';
import multer from 'multer';
import { comparePasswords, hashPassword } from '../util/hash';
import { createToken, reverseToken, verifyToken } from '../util/jwt';
import * as UserDao from '../model/userDao';
import { User } from '../model/User';

export const router = Router();
const upload = multer();

router.post('/login', upload.none(), async (req, res) => {
	const { username, password } = req.body as {
		username: string;
		password: string;
	};

	if (username == null || password == null) {
		return res.status(400).send('Invalid Body');
	}

	const users = await UserDao.selectAll();

	if (!users.some(v => v.getUsername() === username)) {
		return res.status(404).send('User not found');
	}

	const user = users.find(v => v.getUsername() === username);

	if (user == undefined) {
		return res.status(409).send('User not found');
	}

	if (!comparePasswords(password, user.getPassword())) {
		return res.status(400).send("Password doesn't match username");
	}

	const token = createToken(username);

	res.json(token);
});

router.post('/register', upload.none(), async (req, res) => {
	const { username, password, role } = req.body as {
		username: string;
		password: string;
		role: 'Schüler' | 'Lehrbetrieb' | 'Lehrer';
	};

	if (username == null || password == null || role == null) {
		return res.status(400).send('Invalid Body');
	}

	const users = await UserDao.selectAll();

	if (users.some(v => v.getUsername() === username)) {
		return res.status(404).send('Username is already taken');
	}

	await UserDao.insertUser(new User(username, hashPassword(password), role));

	res.send('ok');
});

router.get('/refresh', verifyToken, async (req, res) => {
	const token = req.headers['authorization'] as string;

	const username = reverseToken(token);

	if (username === null) {
		return res.status(400).send('something went wrong');
	}

	res.json(createToken(username));
});

router.get('/verify', verifyToken, async (req, res) => {
	res.send('ok');
});

router.get('/info', verifyToken, async (req, res) => {
	const username = reverseToken(req.headers['authorization'] ?? '');

	const users = await UserDao.selectAll();

	for (const user of users) {
		if (user.getUsername() == username) {
			return res.json({
				username: user.getUsername(),
				userID: user.getUserID(),
			});
		}
	}

	res.status(404).send('not found');
});
