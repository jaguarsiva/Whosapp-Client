import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use './src/styles/abstracts' as *;`
			}
		}
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},
	plugins: [vue()]
});
