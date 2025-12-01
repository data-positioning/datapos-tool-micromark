/**
 * ESLint configuration.
 */

// Dependencies - Vendors.
import tseslint from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

// Exposures - Configuration
export default [
    { ignores: ['dist/**'] },
    {
        files: ['vite.config.ts', 'src/**/*.ts'],
        languageOptions: { parser: tseslintParser, parserOptions: { project: './tsconfig.json' } },
        plugins: {
            '@typescript-eslint': tseslint,
            import: importPlugin
        },
        rules: {
            '@typescript-eslint/consistent-type-imports': 'warn',
            '@typescript-eslint/no-import-type-side-effects': 'warn',

            '@typescript-eslint/explicit-function-return-type': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/strict-boolean-expressions': 'warn',

            'import/no-duplicates': 'off',
            'sort-imports': ['warn', { allowSeparatedGroups: true, ignoreCase: true, memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple'] }],

            'no-empty': 'warn',
            'prefer-const': 'warn'
        }
    }
];
