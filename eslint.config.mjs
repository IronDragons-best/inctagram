import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pkg from '@next/eslint-plugin-next';
import unusedImports from 'eslint-plugin-unused-imports'
const { configs } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: configs.recommended
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  
  {
    plugins: {
      'unused-imports': unusedImports
    },
    rules: {
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'arrow-spacing': ['error', { before: true, after: true }],
      'space-before-blocks': ['error', 'always'],
      'keyword-spacing': ['error', { before: true, after: true }],
      
      'unused-imports/no-unused-imports': 'warn',
      
      '@typescript-eslint/no-unused-vars': ['off'],
      '@typescript-eslint/no-explicit-any': 'warn',
      
      'no-unused-vars': ['warn', {
        vars: 'all', // следить за всеми переменными
        args: 'after-used', // параметры функций после последнего использованного
        ignoreRestSiblings: true, // полезно с rest-операторами
        argsIgnorePattern: '^_', // игнорировать параметры, начинающиеся с "_"
        varsIgnorePattern: '^_'  // игнорировать переменные, начинающиеся с "_"
      }]
    }
  }
];

export default eslintConfig;
