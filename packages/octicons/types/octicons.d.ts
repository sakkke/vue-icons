declare module "@primer/octicons" {
  const icons: Record<
    string,
    {
      symbol: string
      keywords: string[]
      toSVG: (options: Record<string, unknown>) => string
      heights: Record<
        16 | 24,
        {
          width: number
          path: string
          options: {
            version: string
            width: string
            height: string
            viewBox: string
            class: string
            "aria-hidden": string
          }
        }
      >
    }
  >
  export default icons
}
