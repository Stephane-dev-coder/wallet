<template>
  <div class="container mx-auto px-4 mb-20">
    <div class="mt-10">
      <h2 class="text-3xl dark:text-gray-200">F.A.Q</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      <div
        v-for="(question, index) in questions"
        :key="index"
        class="w-full rounded-lg overflow-hidden bg-white p-4"
      >
        <h3 class="font-bold text-blue-500">
          {{ question.q }}
        </h3>
        <p class="text-gray-600 text-sm mt-2">
          {{ question.a }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      questions: [
        {
          q: 'Est ce que STI est une vrai monnaie ?',
          a: "Oui. Le STI tout comme le Bitcoin ou l'ethereum est une vraie monnaie",
        },
        {
          q: 'Est ce que STI est une vrai monnaie ?',
          a: "Oui. Le STI tout comme le Bitcoin ou l'ethereum est une vraie monnaie",
        },
      ],
    }
  },
})
</script>
