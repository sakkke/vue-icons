import { defineConfig } from "rollup"
import typescript from "@rollup/plugin-typescript"
import fs from "fs-extra"

import pkg from "./package.json"

const copy = (jobs) => ({
  name: "copy",
  writeBundle: async () => {
    jobs.forEach(async (job) => {
      await fs.copyFile(job.src, job.dest)
    })
  }
})

const output = {
  globals: { vue: "Vue" },
  name: pkg.name,
  sourcemap: true
}

export default defineConfig({
  plugins: [
    typescript(),
    copy([{ src: "src/types.d.ts", dest: "dist/types.d.ts" }])
  ],
  input: "src/index.ts",
  external: ["vue"],
  output: [
    { ...output, file: pkg.exports["."].require, format: "umd" },
    { ...output, file: pkg.exports["."].import, format: "es" }
  ]
})
