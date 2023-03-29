import { comparePasswords, hashPassword } from '../../src/util/hash';
import { equal } from 'node:assert';

describe('Util | Hash-Funktionen', () => {
	it('Identische Passwörter ergeben den gleichen Hash.', () => {
		const hash = hashPassword('test123');

		equal(comparePasswords('test123', hash), true);
	});

	it('Nicht identische Passwörter ergeben verschiedene Hashes.', () => {
		const hash = hashPassword('test123');

		equal(comparePasswords('test456', hash), false);
	});
});
