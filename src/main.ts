import express from 'express';
import { router as api } from './controllers/api';
import { router as view } from './controllers/view';
import { join } from 'path';
import logger from 'morgan';
import compression from 'compression';
import { create } from 'express-handlebars';
import { createWriteStream } from 'fs';
import { spawnSync } from 'child_process';

import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT ?? 3000;

const PUBLIC_FOLDER = join(process.cwd(), 'src', 'public');

const VIEWS_FOLDER = join(process.cwd(), 'src', 'views');

const LOG_FOLDER = join(process.cwd(), 'logs', `access.log`);

const TINYMCE = join(process.cwd(), 'node_modules', 'tinymce');
const TINYMCE_LANGS = join(
	process.cwd(),
	'node_modules',
	'tinymce-i18n',
	'langs6'
);

const app = express();

app.use(
	logger(process.env.MODE === 'production' ? 'combined' : 'dev', {
		stream:
			process.env.MODE === 'production'
				? createWriteStream(LOG_FOLDER, {
						flags: 'a',
				  })
				: undefined,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.MODE === 'production') {
	app.use(compression());
}

const hbs = create({});

app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

app.set('views', VIEWS_FOLDER);

if (process.env.MODE == 'production') {
	app.enable('view cache');
}

app.use('/api', api);

app.use('/tinymce/langs', express.static(TINYMCE_LANGS));

app.use('/tinymce', express.static(TINYMCE));

app.use('/tinymce', express.static(TINYMCE));

app.use(express.static(PUBLIC_FOLDER));

app.use(view);

export const server = app.listen(PORT, async () => {
	console.log('> Server running on http://127.0.0.1:3000/');

	process.env.MODE === 'production' &&
		spawnSync('explorer', ['http://127.0.0.1:3000/']);
});
