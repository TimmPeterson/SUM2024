//import terser from '@rollup/plugin-terser';
import resolve from "@rollup/plugin-node-resolve";

export default {
    input: "main.js",
    output: {
        dir: "../out",
        format: "iife",
        sourcemap: "inline",
        name: "main.js",
    },
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        // terser()
    ]
}