<template>
  <div
    class="flex flex-col relative"
    :class="{ dark: isDark }"
    style="min-height: 100vh"
  >
    <Navbar :click-connect="clickConnect" />
    <div class="bg-nice-white dark:bg-nice-dark flex-grow">
      <Nuxt />
    </div>
    <div
      v-if="connect && !isConnected"
      class="absolute inset-0 bg-black bg-opacity-40 z-20"
    >
      <div
        class="h-screen flex justify-center items-center sticky"
        @click.self="connect = false"
      >
        <div
          class="
            m-6
            bg-white
            text-lg
            dark:bg-dark-24 dark:text-gray-200
            w-full
            lg:w-2/3
            p-6
            rounded-xl
            flex flex-col
          "
        >
          <div class="flex justify-between">
            Select provider
            <button
              class="
                flex
                items-center
                px-3
                py-2
                hover:bg-gray-100
                dark:hover:bg-dark-8
                rounded-lg
                text-sm
                focus:text-white
                dark:focus:text-black
                focus:bg-black
                dark:focus:bg-white
                focus:ring
                focus:ring-black
                focus:ring-white
                focus:ring-offset-2
                focus:outline-none
                transition
                duration-300
                dark:ring-offset-black
              "
              @click="connect = false"
            >
              Sortir <i class="bx bx-right-arrow-alt ml-2"></i>
            </button>
          </div>
          <div class="mt-6 grid grid-cols-8 gap-4">
            <ProviderMetamask />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'

export default Vue.extend({
  data() {
    return {
      connect: false,
    }
  },
  computed: {
    ...mapState('app', ['isDark', 'darkPreference']),
    ...mapState('wallet', ['isConnected']),
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
          this.setDark()
          break

        default:
          this.setLight()
          break
      }
    }
  },
  methods: {
    clickConnect() {
      this.connect = true
    },
    ...mapMutations('app', ['setDark', 'setLight']),
  },
})
</script>
