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
		description: 'Generate fake TikTok comment images for your marketing ads, UI prototypes, and creative projects.',
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
		},
		...(browser === 'firefox'
			? {
					browser_specific_settings: {
						gecko: {
							id: 'tokgenerator@tokgenerator.com',
							strict_min_version: '109.0',
							data_collection_permissions: {
								required: ['none']
							}
						}
					}
				}
			: {})
	})
});
