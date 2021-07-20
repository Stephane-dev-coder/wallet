<template>
  <div
    class="
      flex flex-col
      items-center
      px-3
      py-1
      dark:hover:bg-dark-8
      rounded
      cursor-pointer
    "
    @click="handleClick"
  >
    <img src="/providers/tokenpocket.png" alt="Token Pocket logo" />
    <span class="text-xs dark:text-gray-400 mt-2">TockenPocket</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  methods: {
    async handleClick() {
      // @TODO Rajouter un syteme qui affiche correctement les erreurs interne
      await this.useWallet('metamask')
    },
    ...mapActions('wallet', ['useWallet']),
  },
})
</script>
