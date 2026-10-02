import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'wxt';

export default defineConfig({
	srcDir: 'src',
	modules: ['@wxt-dev/module-svelte'],
	vite: () => ({
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				$lib: resolve(import.meta.dirname, 'src/lib')
			}
		}
	}),
	manifest: ({ browser }) => ({
		name: 'TokGenerator',
		description: 'Generate fake TikTok comment images for memes and mockups.',
		version: '0.0.1',
		action: {
			default_title: 'TokGenerator'
		},
		permissions: browser === 'firefox' ? ['clipboardWrite'] : ['sidePanel', 'clipboardWrite'],
		host_permissions: ['https://randomuser.me/*', 'https://cdn.jsdelivr.net/*'],
		icons: {
			32: '/icon/32.png',
			96: '/icon/96.png',
			192: '/icon/192.png'
		}
	})
});
