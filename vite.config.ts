import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        coverage: {
            reporter: ['lcov', 'html'],
            exclude: [
                '**/*.spec.ts',
            ],
        },
        exclude: ['**/node_modules/**', '**/build/**']
    }
});
