import { createToken } from '../../src/util/jwt';
import { equal } from 'node:assert';

describe('Util | JsonWebToken-Funktionen', () => {
	it('Zwei zeitlich gleiche Tokens sind nicht gleich.', () => {
		const token1 = createToken('peter');
		const token2 = createToken('peter');

		equal(token1 === token2, false);
	});
});
