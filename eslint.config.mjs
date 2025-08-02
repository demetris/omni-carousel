import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        'warn',
        {
          "args": "all",
          "argsIgnorePattern": "^_$",
          "caughtErrors": "all",
          "caughtErrorsIgnorePattern": "^_$",
          "destructuredArrayIgnorePattern": "^_$",
          "varsIgnorePattern": "^_$",
          "ignoreRestSiblings": true,
        }
      ],
      "curly": [
        "error",
        "all"
      ],
    },
  },
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.astro/**',
      '**/*.js',
      '**/*.cjs',
      '**/*.mjs',
      '**/*.astro',
    ],
  },
);
