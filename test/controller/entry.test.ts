import { spec, request, response } from 'pactum';
import { server } from '../../src/main';
import { token, userID } from './auth.test';
import { Subject } from '../../src/model/Subject';

const PORT = process.env.PORT ?? 3001;

let entry: number | null = null;
let subjectID: number | null = null;

describe('Server | Entry', () => {
	before(async function () {
		if (!server.listening) {
			server.listen(PORT);
		}

		if (token === null) throw new Error('Token ist null');

		request.setDefaultTimeout(5000);
		response.setDefaultExpectResponseTime(5000);
	});

	it('Soll ein Eintrag erstellen', async () => {
		if (token === null) throw new Error('Token ist null');

		const subjectList = await spec()
			.get(`http://localhost:${PORT}/api/subject/list`)
			.withHeaders({ authorization: token })
			.expectStatus(200)
			.expectHeaderContains('content-type', 'application/json')
			.returns(ctx => <{ name: string; subjectID: number }[]>ctx.res.json);

		subjectID = <number>subjectList[0].subjectID;

		if (subjectID === undefined) throw new Error('SubjectID ist null');

		entry = await spec()
			.post(`http://localhost:${PORT}/api/entry/create`)
			.withHeaders({ authorization: token })
			.withMultiPartFormData({
				title: 'TestEntry',
				date: Date.now(),
				subject: subjectID,
				userID,
			})
			.expectStatus(200)
			.expectHeaderContains('content-type', 'application/json')
			.returns(ctx => (<{ entryID: number }>ctx.res.json).entryID);
	});

	it('Soll alle Fächer/Themen zurückbekommen', async () => {
		if (token == null) throw new Error('Token ist null');

		await spec()
			.get(`http://localhost:${PORT}/api/entry/list`)
			.withHeaders({ authorization: token })
			.expectStatus(200)
			.expectHeaderContains('content-type', 'application/json');
	});

	it('Soll ein Fach/Thema zurückbekommen', async () => {
		if (entry == null || token == null)
			throw new Error('Thema oder Token ist null');

		await spec()
			.get(`http://localhost:${PORT}/api/entry/get`)
			.withMultiPartFormData({ id: entry })
			.withHeaders({ authorization: token })
			.expectStatus(200)
			.expectHeaderContains('content-type', 'application/json');
	});

	it('Soll ein Fach/Thema überarbeiten', async () => {
		if (token == null || entry == null) throw new Error('Token ist null');

		await spec()
			.put(`http://localhost:${PORT}/api/entry/update`)
			.withHeaders({ authorization: token })
			.withMultiPartFormData({
				id: entry,
				title: 'TestEntryÜberarbeitet',
				date: Date.now(),
				subjectID,
				content: 'test',
				userID,
			})
			.expectStatus(200)
			.expectBody('OK')
			.end();
	});

	it('Soll ein Fach/Thema löschen', async () => {
		if (token == null) throw new Error('Token ist null');

		await spec()
			.delete(`http://localhost:${PORT}/api/entry/delete`)
			.withMultiPartFormData({
				id: entry,
			})
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
