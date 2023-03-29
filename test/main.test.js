const { spec } = require('pactum');

it('Soll die Startseite zurückgeben.', async () => {
	await spec()
		.get('http://localhost:3000/')
		.expectStatus(200)
		.expectHeaderContains('content-type', 'text/html');
});

it('Soll eine Errorseite mit status 404 zurückgeben.', async () => {
	await spec()
		.get('http://localhost:3000/pageexistiertnicht')
		.expectStatus(404)
		.expectHeaderContains('content-type', 'text/html');
});
