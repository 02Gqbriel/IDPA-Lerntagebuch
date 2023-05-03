import { spec, request, response } from 'pactum';
import { server } from '../../src/main';
import { token } from './auth.test';
import { Subject } from '../../src/model/Subject';

const PORT = process.env.PORT ?? 3001;

let entry: number | null = null;

describe('Server | Entry', () => {
	before(async function () {
		if (!server.listening) {
			server.listen(PORT);
		}

		if (token === null) throw new Error('Token ist null');
	});

	it('Soll ein Eintrag erstellen', async () => {
		if (token === null) throw new Error('Token ist null');

		const subjectList = await spec()
			.get(`http://localhost:${PORT}/api/subject/list`)
			.withHeaders({ authorization: token })
			.expectStatus(200)
			.expectHeaderContains('content-type', 'application/json')
			.returns(ctx => <{ name: string; subjectID: number }[]>ctx.res.json);

		const subject = subjectList[0];

		if (subject === undefined) throw new Error('Subject ist null');

		entry = await spec()
			.post(`http://localhost:${PORT}/api/entry/create`)
			.withHeaders({ authorization: token })
			.withMultiPartFormData({
				title: 'TestEntry',
				date: Date.now(),
				subject: subject.subjectID,
			})
			.expectStatus(200)
			.expectHeaderContains('content-type', 'application/json')
			.returns(ctx => (<{ entryID: number }>ctx.res.json).entryID);
	});

	it('Soll alle Fächer/Themen zurückbekommen', async () => {
		if (token == null) throw new Error('Token ist null');

		await spec()
			.get(`http://localhost:${PORT}/api/subject/list`)
			.withHeaders({ authorization: token })
			.expectStatus(200)
			.expectHeaderContains('content-type', 'application/json');
	});

	it('Soll ein Fach/Thema zurückbekommen', async () => {
		if (entry == null || token == null)
			throw new Error('Thema oder Token ist null');

		await spec()
			.get(`http://localhost:${PORT}/api/subject/list?id=${entry}`)
			.withHeaders({ authorization: token })
			.expectStatus(200)
			.expectHeaderContains('content-type', 'application/json');
	});

	it('Soll ein Fach/Thema überarbeiten', async () => {
		if (token == null || entry == null) throw new Error('Token ist null');

		await spec()
			.put(`http://localhost:${PORT}/api/subject/update`)
			.withHeaders({ authorization: token })
			.withMultiPartFormData({ name: 'Physik', id: entry })
			.expectStatus(200)
			.expectBody('OK');
	});

	it('Soll ein Fach/Thema löschen', async () => {
		if (token == null) throw new Error('Token ist null');

		await spec()
			.delete(`http://localhost:${PORT}/api/subject/delete?id=${entry}`)
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
