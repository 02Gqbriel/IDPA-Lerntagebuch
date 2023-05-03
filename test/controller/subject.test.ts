import { spec } from 'pactum';
import * as SubjectDao from '../../src/model/subjectDao';
import { string, int } from 'pactum-matchers';
import { server } from '../../src/main';
import { Subject } from '../../src/model/Subject';
import { token } from './auth.test';

const PORT = process.env.PORT ?? 3001;

let subject: Subject | null = null;

describe('Server | Subject', () => {
	before(async function () {
		if (!server.listening) {
			server.listen(PORT);
		}

		subject = await SubjectDao.insertSubject(new Subject('Mathematik'));
	});

	it('Soll alle Fächer/Themen zurückbekommen', async () => {
		if (token == null) throw new Error('Token ist null');

		await spec()
			.get(`http://localhost:${PORT}/api/subject/list`)
			.withHeaders({ authorization: token })
			.expectStatus(200)
			.expectHeaderContains('content-type', 'application/json');
	});

	it('Soll ein Fächer/Themen zurückbekommen', async () => {
		if (subject == null || token == null)
			throw new Error('Thema oder Token ist null');

		await spec()
			.get(`http://localhost:${PORT}/api/subject/list?id=${subject}`)
			.withHeaders({ authorization: token })
			.expectStatus(200)
			.expectHeaderContains('content-type', 'application/json');
	});

	after(() => {
		if (server.listening) {
			server.close();
		}
	});
});
