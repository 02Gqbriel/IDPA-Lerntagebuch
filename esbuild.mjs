import copydir from 'copy-dir';
import { build } from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import { existsSync, mkdirSync } from 'fs';
import { join, extname } from 'path';

(async () => {
	await build({
		entryPoints: ['./src/main.ts'],
		bundle: true,
		minify: true,
		platform: 'node',
		outfile: './dist/index.js',
		logLevel: 'info',
		plugins: [
			copy({
				resolveFrom: 'cwd',
				assets: {
					from: ['./src/views/**/*'],
					to: ['./dist/public'],
				},
			}),
		],
	});

	const dir = join(process.cwd(), 'dist', 'public', 'tinymce');

	if (!existsSync(dir)) {
		mkdirSync(dir);
	}

	copydir(
		join(process.cwd(), 'node_modules', 'tinymce'),
		join(process.cwd(), 'dist', 'public', 'tinymce'),
		{
			cover: true,
			filter: (stat, filepath) => {
				if (
					stat === 'file' &&
					extname(filepath) !== '.js' &&
					extname(filepath) !== '.css' &&
					extname(filepath) !== '.ts'
				) {
					return false;
				}

				return true;
			},
		}
	);
})();
