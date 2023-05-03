import { spec } from 'pactum';
import { server } from '../../src/main';
import { token } from './auth.test';

const PORT = process.env.PORT ?? 3001;

let subject: number | null = null;

describe('Server | Subject', () => {
	before(async function () {
		if (!server.listening) {
			server.listen(PORT);
		}
	});

	it('Soll ein Fach/Thema erstellen', async () => {
		if (token == null) throw new Error('Token ist null');

		const res = await spec()
			.post(`http://localhost:${PORT}/api/subject/create`)
			.withHeaders({ authorization: token })
			.withMultiPartFormData({ name: 'Mathematik' })
			.expectStatus(200)
			.expectHeaderContains('content-type', 'application/json');

		subject = res.json;
	});

	it('Soll alle Fächer/Themen zurückbekommen', async () => {
		if (token == null) throw new Error('Thema oder Token ist null');

		await spec()
			.get(`http://localhost:${PORT}/api/subject/list`)
			.withHeaders({ authorization: token })
			.expectStatus(200)
			.expectHeaderContains('content-type', 'application/json');
	});

	it('Soll ein Fach/Thema zurückbekommen', async () => {
		if (subject == null || token == null)
			throw new Error('Thema oder Token ist null');

		await spec()
			.get(`http://localhost:${PORT}/api/subject/list?id=${subject}`)
			.withHeaders({ authorization: token })
			.expectStatus(200)
			.expectHeaderContains('content-type', 'application/json');
	});

	it('Soll ein Fach/Thema überarbeitet', async () => {
		if (token == null) throw new Error('Token ist null');

		await spec()
			.put(`http://localhost:${PORT}/api/subject/update`)
			.withHeaders({ authorization: token })
			.withMultiPartFormData({ name: 'Physik', id: subject })
			.expectStatus(200)
			.expectBody('OK');
	});

	it('Soll ein Fach/Thema löschen', async () => {
		if (token == null) throw new Error('Token ist null');

		await spec()
			.delete(`http://localhost:${PORT}/api/subject/delete?id=${subject}`)
			.withHeaders({ authorization: token })
			.expectStatus(200)
			.expectBody('OK');
	});

	after(() => {
		if (server.listening) {
			server.close();
		}
	});
});
