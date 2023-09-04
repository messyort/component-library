import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import json from "@rollup/plugin-json";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import packageJson from "./package.json" assert { type: "json" };
import processEnv from "rollup-plugin-process-env";
// import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: [".ts", ".tsx", ".js", ".ttf"],
        preferBuiltins: true,
        browser: true,
      }),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      json(),
      processEnv(),
      // terser()
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [],
  },
];
