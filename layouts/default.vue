<template>
  <div
    class="flex flex-col"
    :class="{ dark: isDark }"
    style="min-height: 100vh"
  >
    <Navbar />
    <div class="bg-nice-white dark:bg-nice-dark flex-grow">
      <Nuxt />
    </div>
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
