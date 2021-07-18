<template>
  <div class="container mx-auto px-4 mb-20">
    <div class="mt-10">
      <h2 class="text-3xl">Bienvenue !</h2>
      <h2 class="text-xs mt-1 text-gray-600">
        La revolution est enfin arriver !
      </h2>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
      <WidgetBalance />
      <WidgetEarned />
      <WidgetPrice />
      <WidgetVolume />
      <WidgetNews />
      <WidgetSend />
      <WidgetReceive />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
