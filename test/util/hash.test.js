const { comparePasswords, hashPassword } = require('../../src/util/hash');

it('Identische Passwörter ergeben den gleichen Hash.', () => {
	const hash = hashPassword('test123');

	if (!comparePasswords('test123', hash)) {
		throw new Error('Passwörter-Hash sind nicht gleich!');
	}
});
