<template>
  <div
    class="
      flex flex-row
      bg-white
      dark:bg-black
      items-center
      h-14
      px-4
      border-b border-gray-200
      dark:border-transparent
    "
  >
    <div class="text-lg font-semibold text-gray-700 dark:text-gray-200">
      <NuxtLink to="/">STI2D Wallet</NuxtLink>
    </div>
    <div class="flex-grow flex flex-row justify-end">
      <button
        class="
          flex
          justify-center
          items-center
          h-10
          w-10
          mr-4
          rounded
          transition
          duration-300
          hover:bg-gray-100
          dark:hover:bg-gray-800
          focus:text-white focus:bg-black focus:outline-none
          dark:focus:text-black dark:focus:bg-white
          text-lg
          dark:text-gray-200
        "
        @mousedown="darkMouseDown"
        @mouseup="darkMouseUp"
        @mouseleave="darkMouseUp"
        @click="darkClick"
      >
        <i v-if="isDark" class="bx bx-sun"></i>
        <i v-else class="bx bx-moon"></i>
      </button>
      <button
        class="
          bg-white
          dark:bg-nice-dark
          text-black
          dark:text-white
          border-2 border-black
          dark:border-white
          px-5
          py-2
          text-sm
          rounded-lg
          transition
          duration-300
          ring-offset-2
          hover:text-white
          dark:hover:text-black
          hover:border-black
          dark:hover:border-white
          hover:bg-black
          dark:hover:bg-white
          focus:text-white
          dark:focus:text-black
          focus:bg-black
          dark:focus:bg-white
          focus:border-black
          dark:focus:border-white
          focus:ring focus:ring-black
          dark:focus:ring-white
          focus:outline-none
          dark:ring-offset-black
        "
        @click="handleConnect"
      >
        {{ isConnected ? displayAddress(address) : 'Connnect Wallet' }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapActions, mapState, mapMutations } from 'vuex'

export default Vue.extend({
  props: {
    clickConnect: {
      type: Function as PropType<() => void>,
      default: () => {},
    },
    clickUserSettings: {
      type: Function as PropType<() => void>,
      default: () => {},
    },
  },
  data() {
    return {
      reset: setTimeout(() => {}, 0),
      preventToggle: false,
    }
  },
  computed: {
    ...mapState('app', ['isDark']),
    ...mapState('wallet', ['isConnected', 'address']),
  },
  methods: {
    displayAddress(address: string) {
      return address.slice(0, 4) + '...' + address.slice(address.length - 4)
    },
    handleConnect() {
      if (this.isConnected) {
        if (this.clickUserSettings) this.clickUserSettings()
      } else if (this.clickConnect) this.clickConnect()
    },
    darkMouseDown() {
      const timeoutId = setTimeout(() => {
        this.setDarkPreference('system')
        this.preventToggle = true
        clearTimeout(timeoutId)
      }, 1000)
      this.reset = timeoutId
    },
    darkMouseUp() {
      clearTimeout(this.reset)
    },
    darkClick() {
      if (!this.preventToggle) {
        this.toggleDark()
      }
    },
    ...mapActions('app', ['toggleDark']),
    ...mapMutations('app', ['setDarkPreference']),
  },
})
</script>
