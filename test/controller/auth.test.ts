import { spec } from 'pactum';
import { string, int } from 'pactum-matchers';
import { server } from '../..//src/main';

const PORT = process.env.PORT ?? 3001;

describe('Server | Auth', () => {
	before(function () {
		if (!server.listening) {
			server.listen(PORT);
		}
	});

	it('Soll einen neuen User registieren', async () => {
		const res = await spec()
			.post(`http://localhost:${PORT}/api/auth/register`)
			.withMultiPartFormData({
				username: 'testUser',
				password: 'geheim',
				role: 'Schüler',
			})
			.expectStatus(200)
			.expectHeaderContains('content-type', 'text/plain');

		console.log(res);
	});

	it('Soll einen User einloggen und Token und Ablaufdatum zurückgeben', async () => {
		const res = await spec()
			.post(`http://localhost:${PORT}/api/auth/login`)
			.withMultiPartFormData({
				username: 'testUser',
				password: 'geheim',
			})
			.expectStatus(200)
			.expectHeaderContains('content-type', 'application/json')
			.expectJsonMatch({ token: string(), expires: int() });

		console.log(res);
	});

	after(() => {
		if (server.listening) {
			server.close();
		}
	});
});
