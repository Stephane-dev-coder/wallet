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
import { mapState, mapMutations } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState('app', ['isDark', 'darkPreference']),
  },
  mounted() {
    if (process.browser) {
      switch (this.darkPreference) {
        case 'system':
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.setDark()
          } else {
            this.setLight()
          }
          break
        case 'light':
          this.setLight()
          break

        case 'dark':
          this.setLight()
          break

        default:
          this.setLight()
          break
      }
    }
  },
  methods: {
    ...mapMutations('app', ['setDark', 'setLight']),
  },
})
</script>
