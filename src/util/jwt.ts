import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.TOKEN_SECRET as string | undefined;

export function createToken(username: string) {
	if (secret === undefined) {
		throw new Error(
			'TOKEN_SECRET wurde nicht in den Umgebungvariabeln gefunden!'
		);
	}

	const exp = Math.floor(Date.now() / 1000) + 60 * 20;

	return {
		token: jwt.sign(
			{
				exp,
				data: username,
			},
			secret
		),
		expires: exp,
	};
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
	if (secret === undefined) {
		throw new Error(
			'TOKEN_SECRET wurde nicht in den Umgebungvariabeln gefunden!'
		);
	}

	const token = req.headers['authorization'];

	if (token === undefined) {
		return res.sendStatus(401);
	}

	try {
		jwt.verify(token, secret);

		next();
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
}
