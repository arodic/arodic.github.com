import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

function makeBundleTarget(src, target) {
  return {
    input: src,
    plugins: [
      nodeResolve({
        moduleDirectories: ['node_modules', 'packages'],
      }),
      terser({
        keep_classnames: true,
        keep_fnames: true,
        compress: {
          keep_infinity: true,
        }
      })
    ],
    // treeshake: true,
    output: [{
      inlineDynamicImports: true,
      format: 'es',
      file: target,
      indent: '  '
    }],
    onwarn: (warning, warn) => {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      warn(warning);
    }
  };
}

export default [
  makeBundleTarget('build/index.js', 'bundle/index.js'),
];
