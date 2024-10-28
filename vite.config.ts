import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import {fileURLToPath} from 'url';
import dts from "vite-plugin-dts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    plugins: [vue(), dts()],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'AltinBot',
            fileName: "altin-bot",
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    }
});
