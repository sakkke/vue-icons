<template>
  <div
    class="
      d-flex
      flex-column
      align-items-center
      mb-3
      sticky-top
      py-3
      bg-white
      border-bottom
    "
  >
    <div class="container d-flex flex-column flex-md-row">
      <div class="input-group me-1 mb-2 mb-md-0">
        <span class="input-group-text">
          <search-icon />
        </span>
        <input
          class="form-control"
          type="text"
          id="search"
          placeholder="Search..."
          v-model="search"
        />
      </div>

      <button
        class="col-12 col-md-2 btn btn-outline-primary"
        v-on:click="toggleCustomize"
      >
        Customize
      </button>
    </div>
    <customize v-if="showCustomize" class="m-2" />
  </div>

  <div class="container my-3">
    <small class="text-muted">
      Click on an any icon to copy the Vue import statement (e.g.
      <code>import { BoldIcon } from "{{ pack.package }}"</code>).
    </small>
  </div>

  <div class="container d-flex flex-wrap">
    <div
      v-for="(icon, index) in icons"
      :key="index"
      class="col-6 col-sm-4 col-md-3 col-lg-2 p-1"
    >
      <div
        id="icon"
        class="d-flex flex-column align-items-center bg-white rounded p-1"
        v-on:click="copyImport(icon)"
      >
        <component
          :is="icon"
          :size="customize.size"
          :stroke="customize.color"
          :stroke-width="customize.strokeWidth"
          class="m-2"
        />
        <small>{{ icon.name }}</small>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, PropType } from "vue"
import copyToClipboard from "copy-to-clipboard"
import { SearchIcon, Icon } from "@vue-icons/feather"

import Customize from "./Customize.vue"
import { useStore } from "../store"
import { Pack } from "../pack"

export default defineComponent({
  name: "PackViewer",
  components: {
    Customize,
    SearchIcon
  },
  props: {
    pack: {
      type: Object as PropType<Pack>,
      required: true
    }
  },
  setup(props) {
    const store = useStore()

    const customize = computed(() => store.state.customize)
    const showCustomize = ref(false)
    const toggleCustomize = () => {
      showCustomize.value = !showCustomize.value
    }

    const search = computed({
      get: () => store.state.search,
      set: (value) => store.commit("setSearch", value)
    })

    const icons = computed(() => {
      if (search.value == "") return Object.values(props.pack.icons)
      const searchValue = search.value.toLowerCase()
      return Object.values(props.pack.icons).filter((icon) =>
        icon.name.toLowerCase().includes(searchValue)
      )
    })

    const copyImport = (icon: Icon) => {
      copyToClipboard(`import { ${icon.name} } from "@vue-icons/feather"\n`)
    }

    return {
      icons,
      search,
      customize,
      showCustomize,
      toggleCustomize,
      copyImport
    }
  }
})
</script>

<style lang="scss">
#icon {
  cursor: pointer;
  transition: color ease 0.1s, background-color ease 0.1s;
  &:hover {
    color: var(--bs-light) !important;
    background-color: var(--bs-primary) !important;
  }
}
</style>
