<template>
  <div class="h-screen" :class="{ dark: isDark }">
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState('app', ['isDark']),
  },
})
</script>
