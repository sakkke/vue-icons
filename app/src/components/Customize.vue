<template>
  <div class="container d-flex">
    <div class="col-10">
      <inline-input id="size" label="Size" class="m-1">
        <input
          type="range"
          class="form-range"
          min="4"
          max="128"
          step="1"
          v-model="size"
        />
      </inline-input>
      <inline-input id="color" label="Color" class="m-1">
        <button
          type="button"
          class="btn btn-sm me-2 p-3"
          v-for="item in colors"
          v-bind:key="item.name"
          v-bind:style="{ backgroundColor: item.hex }"
          v-on:click="() => (color = item.hex)"
        ></button>
      </inline-input>
    </div>
    <div class="col-2">
      <input class="form-control m-1" type="text" :value="size" readonly />
      <input class="form-control m-1" type="text" :value="color" readonly />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"
import { useStore } from "../store"

import InlineInput from "./InlineInput.vue"

export default defineComponent({
  name: "Customize",
  components: {
    InlineInput
  },
  setup() {
    const store = useStore()

    const size = computed({
      get: () => store.state.customize.size,
      set: (value) => store.commit("setCustomizeSize", value)
    })

    const color = computed({
      get: () => store.state.customize.color,
      set: (value) => store.commit("setCustomizeColor", value)
    })

    const colors = [
      { name: "black", hex: "#000000" },
      { name: "gray", hex: "#6c757d" },
      { name: "white", hex: "#ffffff" },
      { name: "blue", hex: "#0d6efd" },
      { name: "indigo", hex: "#6610f2" },
      { name: "purple", hex: "#6f42c1" },
      { name: "pink", hex: "#d63384" },
      { name: "red", hex: "#dc3545" },
      { name: "orange", hex: "#fd7e14" },
      { name: "yellow", hex: "#ffc107" },
      { name: "green", hex: "#198754" },
      { name: "teal", hex: "#20c997" },
      { name: "cyan", hex: "#0dcaf0" }
    ]

    return {
      colors,
      size,
      color
    }
  }
})
</script>
