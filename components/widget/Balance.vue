<template>
  <div class="bg-white shadow-lg rounded-lg p-4 flex flex-col">
    <h3 class="text-lg flex justify-between items-center text-gray-500">
      Solde
    </h3>
    <p v-if="isConnected" class="font-bold text-lg">
      673248.87 <span class="text-blue-500">STI</span>
    </p>
    <div v-else class="flex items-center font-bold">
      <div class="h-4 w-32 bg-gray-200 rounded-sm"></div>
      <span class="ml-2 text-blue-500">STI</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState('wallet', ['isConnected']),
  },
})
</script>
