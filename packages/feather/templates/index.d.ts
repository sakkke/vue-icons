import { DefineComponent, SVGAttributes } from "vue"

declare type Icon = DefineComponent<{ size: number | string } & SVGAttributes>

declare module "@vue-icons/feather" {
  // %%declarations%%
}

declare module "@vue-icons/feather/*" {
  export const icon: Icon
}
