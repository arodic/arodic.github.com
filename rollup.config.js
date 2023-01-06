import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

function makeBundleTarget(src, target, externals = [], debug) {

  externals.forEach(function(part, index) {
    externals[index] = path.resolve(externals[index]);
  });

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
    output: [{
      inlineDynamicImports: true,
      format: 'es',
      file: target,
      indent: '  '
    }],
    external: externals,
    onwarn: (warning, warn) => {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      warn(warning);
    }
  };
}

export default [
  makeBundleTarget('build/index.js', 'bundle/index.js'),
];
