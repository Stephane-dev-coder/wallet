<template>
  <div class="container mx-auto px-4 mb-20">
    <div class="mt-10">
      <h2 class="text-3xl dark:text-gray-200">Bienvenue !</h2>
      <h2 class="text-xs mt-1 text-gray-600 dark:text-gray-400">
        La revolution est enfin arriver !
      </h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
      <WidgetBalance />
      <WidgetEarned />
      <WidgetPrice />
      <WidgetVolume />
      <WidgetNews />
      <WidgetSend v-if="isConnected" />
      <WidgetSendBlured v-else />
      <WidgetReceive v-if="isConnected" />
      <WidgetReceiveBlured v-else />
      <WidgetAppstore />
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
