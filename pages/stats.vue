<template>
  <div class="container mx-auto px-4 mb-20">
    <div class="mt-10">
      <h2 class="text-3xl dark:text-gray-200">Statistiques</h2>
      <h2 class="text-xs mt-1 text-gray-600 dark:text-gray-400">
        Toutes les statistiques en temps reel !
      </h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
      <WidgetStat name="Prix" value="0.00005$" />
      <WidgetStat name="Volume" value="1508$" today />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
