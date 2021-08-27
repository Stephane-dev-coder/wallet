<template>
  <div class="container mx-auto px-4 mb-20">
    <div class="mt-10">
      <h2 class="text-3xl dark:text-gray-200">La Caverne</h2>
      <span class="text-sm dark:text-gray-400"
        >Il est temps d'utiliser votre puissance de minage !
      </span>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
      <div
        class="
          w-full
          rounded-2xl
          overflow-hidden
          bg-white
          dark:bg-dark-1
          p-4
          cursor-pointer
          transform
          duration-100
          hover:scale-105 hover:shadow-xl
        "
        @click="goStake()"
      >
        <h3 class="text-xl text-center font-semibold dark:text-white">
          Le filon
        </h3>

        <img src="/staker.png" class="mt-4 md:p-16" />
      </div>
      <div
        class="
          w-full
          rounded-lg
          overflow-hidden
          bg-white
          dark:bg-dark-1
          p-4
          cursor-pointer
          transform
          duration-100
          hover:scale-105 hover:shadow-xl
        "
        @click="goMint()"
      >
        <h3 class="text-xl text-center font-semibold dark:text-white">
          La forge
        </h3>
        <img src="/minter.png" class="mt-4 md:p-16" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    goStake() {
      this.$router.push('/caverne/filon')
    },
    goMint() {
      this.$router.push('/caverne/forge')
    },
  },
})
</script>
