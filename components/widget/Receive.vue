<template>
  <div
    class="
      bg-white
      shadow-lg
      rounded-lg
      p-4
      flex flex-col
      col-span-1
      dark:bg-dark-1
      relative
    "
  >
    <h3
      class="
        text-lg
        flex
        justify-between
        items-center
        text-gray-500
        dark:text-gray-400
      "
    >
      Receive
    </h3>
    <div class="flex flex-col justify-center items-center flex-grow">
      <button
        class="
          group
          w-10/12
          text-sm text-center
          break-words
          hover:text-blue-500
          transition
          duration-100
          dark:text-white dark:hover:text-blue-500
          relative
        "
        @click="copy"
      >
        <transition name="fade">
          <div
            v-if="coppied"
            class="absolute inset-x-0 top-0 flex justify-center"
          >
            <div
              class="
                py-1
                dark:text-white dark:bg-black dark:bg-opacity-75
                rounded
                w-24
                transform
                -translate-y-9
              "
            >
              Copier !
            </div>
          </div>
        </transition>
        <span class="transform group-focus:scale-95">
          {{ address }}
        </span>
      </button>
      <input
        ref="address"
        type="text"
        class="absolute"
        style="z-index: -1"
        :value="address"
      />
      <div class="flex justify-center bg-white shadow-xl p-2 rounded-xl mt-4">
        <img src="/qrcode.png" alt="" />
      </div>
      <button
        class="
          mt-6
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
      >
        Partager <i class="bx bxs-share-alt ml-2"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  data() {
    return {
      coppied: false,
    }
  },
  computed: {
    ...mapState('wallet', ['address']),
  },
  methods: {
    copy() {
      const address = this.$refs.address as any
      address.focus()
      address.select()

      setTimeout(() => {
        if (document.execCommand('copy')) {
          this.coppied = true
          setTimeout(() => {
            this.coppied = false
          }, 3000)
        }
      }, 100)
    },
  },
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
