import { spec } from 'pactum';
import { string, int } from 'pactum-matchers';
import { server } from '../..//src/main';

const PORT = process.env.PORT ?? 3001;

const username = 'z-user-' + Date.now();
const password = 'geheim';

export let token: string | null = null;

describe('Server | Auth', () => {
	before(function () {
		if (!server.listening) {
			server.listen(PORT);
		}
	});

	it('Soll einen neuen User registieren', async () => {
		await spec()
			.post(`http://localhost:${PORT}/api/auth/register`)
			.withMultiPartFormData({
				username,
				password,
				role: 'Schüler',
			})
			.expectStatus(200)
			.expectHeaderContains('content-type', 'text/html');
	});

	it('Soll einen User einloggen und Token und Ablaufdatum zurückgeben', async () => {
		const res = await spec()
			.post(`http://localhost:${PORT}/api/auth/login`)
			.withMultiPartFormData({
				username,
				password,
			})
			.expectStatus(200)
			.expectHeaderContains('content-type', 'application/json')
			.expectJsonMatch({ token: string(), expires: int() });

		token = res.json.token;
	});

	after(() => {
		if (server.listening) {
			server.close();
		}
	});
});
