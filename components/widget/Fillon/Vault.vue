<template>
  <div class="w-full rounded-2xl overflow-hidden bg-white dark:bg-dark-1 p-4">
    <div class="flex justify-between">
      <h3 class="text-xl font-semibold dark:text-white">
        {{ 0.02 }}
      </h3>
      <img
        src="/pickaxe/netherite.png"
        class="h-8 w-8 bg-gray-100 dark:bg-dark-2 rounded"
      />
    </div>
    <div class="flex mt-5 justify-between">
      <button
        class="
          bg-white
          dark:bg-nice-dark
          text-black
          dark:text-white
          border-2 border-black
          dark:border-white
          px-5
          py-2
          text-sm
          rounded-lg
          transition
          duration-300
          ring-offset-2
          focus:text-white
          dark:focus:text-black
          focus:bg-black
          dark:focus:bg-white
          focus:border-black
          dark:focus:border-white
          focus:ring focus:ring-black
          dark:focus:ring-white
          focus:outline-none
          dark:ring-offset-black
        "
      >
        <i v-if="false" class="bx bx-loader-alt animate-spin mr-1"></i>
        <span v-else>Claim <i class="bx bxs-send ml-2"></i></span>
      </button>
      <button
        class="
          bg-white
          dark:bg-nice-dark
          text-black
          dark:text-white
          border-2 border-black
          dark:border-white
          px-5
          py-2
          text-sm
          rounded-lg
          transition
          duration-300
          ring-offset-2
          focus:text-white
          dark:focus:text-black
          focus:bg-black
          dark:focus:bg-white
          focus:border-black
          dark:focus:border-white
          focus:ring focus:ring-black
          dark:focus:ring-white
          focus:outline-none
          dark:ring-offset-black
        "
      >
        <i v-if="false" class="bx bx-loader-alt animate-spin mr-1"></i>
        <span v-else>Miner <i class="bx bxs-send ml-2"></i></span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend<any, any, any, any>({})
</script>
