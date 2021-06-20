import { defineComponent, computed, h } from "vue"

const data = "%%icon%%"

export default defineComponent({
  name: "%%name%%",
  props: {
    size: {
      type: [Number, String],
      default: 24
    }
  },
  setup(props, context) {
    const width = computed(() => context.attrs.width || props.size)
    const height = computed(() => context.attrs.height || props.size)

    return () =>
      h("svg", {
        ...data.attrs,
        width: width.value,
        height: height.value,
        innerHTML: data.contents
      })
  }
})
