import typescript2 from 'rollup-plugin-typescript2';
import omt from '@surma/rollup-plugin-off-main-thread';
import replace from 'rollup-plugin-replace';
import cleanup from 'rollup-plugin-cleanup';

const pkg = require('../package.json');
const version = pkg.version;

export default {
  input: ['src/bootstrap.ts'],
  output: {
    dir: 'dist',
    format: 'amd',
    sourcemap: false
  },
  plugins: [
    typescript2(),
    //omt(),
    replace({
      delimiters: ['{{', '}}'],
      version,
      ENVIRONMENT: JSON.stringify('production')
    }),
    cleanup()
  ]
}
