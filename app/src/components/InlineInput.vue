<template>
  <div class="d-flex align-items-center row">
    <label :for="id" class="col-sm-2 col-form-label">{{ label }}</label>
    <div class="col-sm-10 d-flex">
      <slot :id="id"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "InlineInput",
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  }
})
</script>
