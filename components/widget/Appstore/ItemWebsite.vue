<template>
  <a :href="to" target="_blank" class="flex flex-col items-center w-32">
    <div
      class="
        h-32
        w-32
        bg-white
        rounded-2xl
        bg-white
        shadow-lg
        cursor-pointer
        transform
        duration-100
        hover:scale-105 hover:shadow-xl
        overflow-hidden
      "
    >
      <img :src="image" alt="" />
    </div>
    <span class="text-xs mt-4 dark:text-white">{{ name }}</span>
  </a>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      default: '',
    },
  },
})
</script>
