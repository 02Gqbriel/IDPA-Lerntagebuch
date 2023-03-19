import { build } from 'esbuild';
import { copy } from 'esbuild-plugin-copy';

build({
	entryPoints: ['./src/main.ts'],
	bundle: true,
	minify: true,
	platform: 'node',
	outfile: './dist/index.js',
	plugins: [
		copy({
			resolveFrom: 'cwd',
			assets: {
				from: ['./src/views/*'],
				to: ['./dist/public'],
			},
		}),
	],
});
