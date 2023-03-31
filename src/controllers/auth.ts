import { Router } from 'express';
import multer from 'multer';
import { comparePasswords, hashPassword } from '../util/hash';
import { createToken, verifyToken } from '../util/jwt';

export const router = Router();
const upload = multer();

const users: {
	[key: string]: { passwordHash: string; role: 'student' | 'firm' | 'teacher' };
} = {};

router.post('/login', upload.none(), async (req, res) => {
	const { username, password } = req.body as {
		username: string;
		password: string;
	};

	if (username == null || password == null) {
		return res.status(400).send('Invalid Body');
	}

	if (!users[username]) {
		return res.status(404).send('User not found');
	}

	if (!comparePasswords(password, users[username].passwordHash)) {
		return res.status(400).send("Password doesn't match username");
	}

	const token = createToken(username);

	res.json(token);
});

router.post('/register', upload.none(), async (req, res) => {
	const { username, password, role } = req.body as {
		username: string;
		password: string;
		role: 'student' | 'firm' | 'teacher';
	};

	if (username == null || password == null || role == null) {
		return res.status(400).send('Invalid Body');
	}

	if (users[username]) {
		return res.status(404).send('Username is already taken');
	}

	users[username] = { passwordHash: hashPassword(password), role };

	res.send('ok');
});

router.get('/refresh', verifyToken, async (req, res) => {
	const token = req.headers['authorization'];

	if (token === undefined) {
		return res.status(401).send('No token found');
	}

	res.send('ok');
});
