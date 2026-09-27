import { mdsvex, escapeSvelte } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { codeToHtml } from 'shiki';

const theme = 'gruvbox-dark-hard';

const highlighter = async (code, lang = 'text') => {
	const html = await codeToHtml(code, { lang, theme });
	return `{@html \`${escapeSvelte(html)}\` }`;
};

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter(),
			preprocess: [
				mdsvex({
					extensions: ['.svx', '.md'],
					highlight: { highlighter }
				})
			],
			extensions: ['.svelte', '.svx', '.md']
		})
	]
});
