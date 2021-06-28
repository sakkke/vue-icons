import { defineConfig } from "rollup"

import pkg from "./package.json"

const output = {
  globals: { vue: "Vue" },
  sourcemap: true
}

export default defineConfig([
  {
    input: "lib/index.js",
    external: ["vue"],
    output: [
      {
        ...output,
        file: pkg.exports["."].require,
        format: "umd",
        name: pkg.name
      },
      {
        ...output,
        file: pkg.exports["."].import,
        format: "esm",
        exports: "named"
      }
    ]
  }
])
