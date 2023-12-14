import {readFileSync} from 'fs';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

const extensions = ['.mjs', '.js', '.ts', '.json'];

const config = {
    input: 'src/cli.js',
    output: {
        file: 'output/cli.cjs',
        format: 'cjs'
    },
    context: 'global',
    plugins: [
        replace({
            preventAssignment: true,
            values: {
                'process.env.VERSION': JSON.stringify(pkg.version)
            }
        }),
        nodeResolve({
            preferBuiltins: true,
            extensions
        }),
        commonjs({}),
        json(),
        babel({
            generatorOpts: {
                compact: true,
                minified: true,
                preverseComment: false,
                shouldPrintComment: () => false
            },
            babelHelpers: 'bundled'
        })
    ]
};

export default config;
