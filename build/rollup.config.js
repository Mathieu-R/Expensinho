import rimraf from 'rimraf'
import scss from 'rollup-plugin-scss';
import postcss from 'rollup-plugin-postcss'
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy'
import htmlTemplate from 'rollup-plugin-generate-html-template';
import replace from '@rollup/plugin-replace';
import progress from 'rollup-plugin-progress';
import filesize from 'rollup-plugin-filesize';

const pkg = require('../package.json');
const version = pkg.version;

// clean dist folder
rimraf.sync("dist");

function buildConfig({debug}) {
  return {
    input: {
      bootstrap: 'src/bootstrap.ts',
      sw: 'src/sw.ts'
    },
    output: {
      dir: 'dist',
      format: 'amd',
      sourcemap: debug ? true : false,
      entryFileNames: "[name].js",
      chunkFileNames: "[name]-[hash].js"
    },
    watch: {
      clearscreen: true
    },
    plugins: [
      scss({
        output: 'bundle.css',
        watch: 'src/style'
      }),
      postcss({
        minimize: debug ? false : true,
        modules: {
          generateScopedName: "[hash:base64:5]"
        },
      }),
      typescript(),
      copy({
        targets: [
          {src: 'src/static', dest: 'dist/static'},
          {src: 'src/manifest/json', dest: 'dist/manifest.json'}
        ]
      }),
      htmlTemplate({
        template: 'index.html',
        target: 'dist/index.html'
      }),
      replace({
        delimiters: ['{{', '}}'],
        version,
        ENVIRONMENT: debug ? JSON.stringify('development') : JSON.stringify('production')
      }),
      progress(),
      filesize()
    ]
  }
}

export default function({debug}) {
  return buildConfig({debug})
}
