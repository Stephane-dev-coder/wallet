<template>
  <div class="container mx-auto">
    <div class="mt-10">
      <h2 class="text-3xl">Bienvenue !</h2>
      <h2 class="text-xs mt-1 text-gray-600">
        La revolution est enfin arriver !
      </h2>
    </div>
    <div class="grid grid-cols-3 gap-4 mt-10">
      <WidgetNews />
      <div class="bg-white shadow rounded p-4">Transactions</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
