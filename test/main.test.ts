import { spec } from 'pactum';
import { server } from '../src/main';

const PORT = process.env.PORT ?? 3001;

describe('Server | Main', () => {
	before(function () {
		if (!server.listening) {
			server.listen(PORT);
		}
	});

	it('Soll die Startseite zurückgeben.', async () => {
		await spec()
			.get(`http://localhost:${PORT}/`)
			.expectStatus(200)
			.expectHeaderContains('content-type', 'text/html');
	});

	it('Soll eine Errorseite mit status 404 zurückgeben.', async () => {
		await spec()
			.get(`http://localhost:${PORT}/pageexistiertnicht`)
			.expectStatus(404)
			.expectHeaderContains('content-type', 'text/html');
	});

	after(() => {
		if (server.listening) {
			server.close();
		}
	});
});
