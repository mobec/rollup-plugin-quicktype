import typescript from '@rollup/plugin-typescript';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  plugins: [typescript({ sourceMap: false })],
  external: ['quicktype'],
  output: [
    { format: 'cjs', file: pkg.main, exports: 'auto' },
    { format: 'esm', file: pkg.module }
  ]
};