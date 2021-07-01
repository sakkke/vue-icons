<template>
  <div style="background-color: var(--bs-gray-dark)">
    <div class="container text-light py-2">
      <h2>{{ pack.name }}</h2>
      <p>{{ pack.description }}</p>

      <pre
        class="my-2 bg-dark rounded p-2"
        style="color: var(--bs-pink)"
      >npm install {{ pack.package }}<br />yarn add {{ pack.package }}</pre>

      <div class="my-2">
        <a
          v-bind:href="pack.website"
          target="_blank"
          class="btn btn-sm btn-primary me-1"
        >
          <span class="me-1 align-middle">Website</span>
          <ExternalLinkIcon size="18" />
        </a>

        <a
          v-bind:href="pack.sources"
          target="_blank"
          class="btn btn-sm btn-primary me-1"
        >
          <span class="me-1 align-middle">Sources</span>
          <CodeIcon size="18" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import { ExternalLinkIcon, CodeIcon } from "@vue-icons/feather"

import { Pack } from "../pack"

export default defineComponent({
  components: {
    ExternalLinkIcon,
    CodeIcon
  },
  props: {
    pack: {
      type: Object as PropType<Pack>,
      required: true
    }
  }
})
</script>
