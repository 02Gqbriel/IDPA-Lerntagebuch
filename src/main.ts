import express from 'express';
import { router } from './controllers/router';
import { join } from 'path';

const PORT = process.env.PORT ?? 3000;
const PUBLIC_FOLDER =
	process.env.MODE === 'production'
		? join(process.cwd(), 'dist', 'public')
		: join(process.cwd(), 'src', 'views');

const app = express();

app.use('/api', router);

app.use(express.static(PUBLIC_FOLDER));

app.get('*', (req, res) => {
	res.status(404).sendFile(join(PUBLIC_FOLDER, '404.html'));
});

app.listen(PORT, () => {
	console.log('> Server running on http://127.0.0.1:3000/');
});
