<template>
  <div class="bg-light min-vh-100">
    <navigation />
    <pack-details v-bind:pack="pack" />
    <pack-viewer v-bind:pack="pack" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import * as feather from "@vue-icons/feather"

import Navigation from "./components/Navigation.vue"
import PackViewer from "./components/PackViewer.vue"
import PackDetails from "./components/PackDetails.vue"

export default defineComponent({
  name: "App",
  components: {
    Navigation,
    PackViewer,
    PackDetails
  },
  setup() {
    return {
      pack: {
        name: "Feather",
        package: "@vue-icons/feather",
        description: "Simply beautiful open source icons",
        website: "https://feathericons.com/",
        sources: "https://github.com/feathericons/feather",
        icons: Object.values(feather)
      }
    }
  }
})
</script>
