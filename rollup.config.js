import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

const externals = [
  '../lib/iogui.js',
];

function makeBundleTarget(src, target) {
  const _externals = [...externals];
  externals.push(path.resolve(src));
  return {
    input: src,
    plugins: [
      nodeResolve(),
      terser({
        keep_classnames: true,
        keep_fnames: true,
      })
    ],
    treeshake: true,
    inlineDynamicImports: true,
    output: [{
      format: 'es',
      file: target,
      indent: '  '
    }],
    external: _externals,
    onwarn: (warning, warn) => {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      warn(warning);
    }
  };
}

export default [
  makeBundleTarget('build/index.js', 'bundle/index.js'),
];
