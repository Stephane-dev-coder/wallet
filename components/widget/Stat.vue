<template>
  <div class="bg-white dark:bg-dark-1 shadow-lg rounded-lg p-4 flex flex-col">
    <h3
      class="
        text-lg
        flex
        justify-between
        items-center
        text-gray-500
        dark:text-gray-400
      "
    >
      {{ name }}
      <span v-if="today" class="text-sm text-gray-400 dark:text-gray-600"
        >24H</span
      >
    </h3>
    <p v-if="value != ''" class="font-bold text-lg dark:text-white">
      {{ value }}
    </p>

    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    today: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
