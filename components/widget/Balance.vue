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
      Solde
    </h3>
    <p
      v-if="isConnected && balance != null"
      class="font-bold text-lg dark:text-white"
    >
      {{ balance }} <span class="text-blue-500">STI</span>
    </p>
    <div v-else class="flex items-center font-bold">
      <div
        class="h-4 w-32 bg-gray-200 dark:bg-dark-8 rounded-sm"
        :class="{ 'animate-pulse': isConnected && balance == null }"
      ></div>
      <span class="ml-2 text-blue-500">STI</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState('wallet', ['isConnected', 'balance']),
  },
})
</script>
