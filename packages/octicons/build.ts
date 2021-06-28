// eslint-disable-next-line
/// <reference path="./types/octicons.d.ts" />
import iconPack from "@primer/octicons"
import prettier from "prettier"
import { dirname, join } from "path"
import { upperFirst, camelCase } from "lodash"
import fs from "fs-extra"

const input = "templates"
const output = "src"

const iconBlob = fs.readFileSync(join(input, "icon.ts"), "utf8")
const indexBlob = fs.readFileSync(join(input, "index.ts"), "utf8")
const typesBlob = fs.readFileSync(join(input, "types.d.ts"), "utf8")

const templates = {
  icon: (name: string, icon: Record<string, unknown>) => {
    return iconBlob
      .replace(`"%%name%%"`, `"${name}"`)
      .replace(`"%%icon%%"`, `${JSON.stringify(icon)}`)
  },

  index: (exports: string) => {
    return indexBlob.replace(`// %%exports%%`, `${exports}`)
  },

  types: (declarations: string) => {
    return typesBlob.replace(`// %%declarations%%`, `${declarations}`)
  }
}

const formatter = async (): Promise<(blob: string) => string> => {
  const options = await prettier.resolveConfig(".")
  return (blob: string) => {
    return prettier.format(blob, { ...options, parser: "typescript" })
  }
}

const main = async () => {
  await fs.emptyDir(output)

  const format = await formatter()

  const index: string[] = []
  const types: string[] = []

  Object.keys(iconPack).forEach(async (slug) => {
    const icon = {
      slug,
      name: upperFirst(camelCase(`${slug.replace(/-(\d+)/, "$1")}-icon`))
    }

    index.push(`export { default as ${icon.name} } from "./${icon.name}"`)
    types.push(`export const ${icon.name}: Icon`)

    const blob = templates.icon(icon.name, {
      name: iconPack[icon.slug].symbol,
      icon: iconPack[icon.slug].heights[24] || iconPack[icon.slug].heights[16],
      tags: iconPack[icon.slug].keywords
    })
    const path = join(output, `${icon.name}.ts`)

    await fs.ensureDir(dirname(path))
    await fs.writeFile(path, format(blob), "utf8")
  })

  const indexBlob = format(templates.index(index.join("\n")))
  await fs.outputFile(join(output, `index.ts`), indexBlob, "utf8")

  const typesBlob = format(templates.types(types.join("\n")))
  await fs.outputFile(join(output, `types.d.ts`), typesBlob, "utf8")
}

try {
  main()
} catch (error) {
  console.log(error)
}
