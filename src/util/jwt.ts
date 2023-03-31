import jwt from 'jsonwebtoken';

const secret = process.env.TOKEN_SECRET as string | undefined;

export function createToken(username: string) {
	if (secret === undefined) {
		throw new Error(
			'TOKEN_SECRET wurde nicht in den Umgebungvariabeln gefunden!'
		);
	}

	return {
		token: jwt.sign(username, secret, { expiresIn: 1000 * 60 * 20 }),
		expires: new Date(Date.now() + 1000 * 60 * 20),
	};
}

export function verifyToken(token: string) {
	if (secret === undefined) {
		throw new Error(
			'TOKEN_SECRET wurde nicht in den Umgebungvariabeln gefunden!'
		);
	}

	return jwt.verify(token, secret);
}
