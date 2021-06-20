<template>
  <div
    class="navbar navbar-expand navbar-dark"
    style="background-color: var(--bs-gray-dark)"
  >
    <div class="container">
      <a class="navbar-brand">
        <h2 class="m-0">Vue Icons</h2>
      </a>

      <nav class="navbar-nav">
        <a
          class="nav-link"
          target="_blank"
          href="https://github.com/vue-icons/vue-icons"
          >Github</a
        >
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "Navigation"
})
</script>
