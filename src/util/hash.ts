import { pbkdf2Sync } from 'node:crypto';

const salt = process.env.SALT as string | undefined;

console.log(salt);

export function hashPassword(password: string): string {
	if (salt === undefined) {
		throw new Error('SALT wird nicht in den Umgebungvariabeln gefunden!');
	}

	return pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

export function comparePasswords(password: string, hash: string): boolean {
	if (salt === undefined) {
		throw new Error('SALT wird nicht in den Umgebungvariabeln gefunden!');
	}

	const newhash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

	return hash === newhash;
}
