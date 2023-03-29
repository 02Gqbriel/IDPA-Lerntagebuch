import express from 'express';
import { router } from './controllers/router';
import { join } from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT ?? 3000;
const PUBLIC_FOLDER =
	process.env.MODE === 'production'
		? join(process.cwd(), 'dist', 'public')
		: join(process.cwd(), 'src', 'views');

const TINYMCE =
	process.env.MODE === 'production'
		? join(PUBLIC_FOLDER, 'tinymce')
		: join(process.cwd(), 'node_modules', 'tinymce');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', router);

app.use('/tinymce', express.static(TINYMCE));

app.use(express.static(PUBLIC_FOLDER));

app.get('*', (req, res) => {
	res.status(404).sendFile(join(PUBLIC_FOLDER, '404.html'));
});

app.listen(PORT, () => {
	console.log('> Server running on http://127.0.0.1:3000/');
});
