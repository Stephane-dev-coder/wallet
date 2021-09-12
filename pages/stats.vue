<template>
  <div class="container mx-auto px-4 mb-20">
    <div class="mt-10">
      <h2 class="text-3xl dark:text-gray-200">Statistiques</h2>
      <h2 class="text-xs mt-1 text-gray-600 dark:text-gray-400">
        Toutes les statistiques pas (encore) en temps réel.
      </h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
      <WidgetStat name="Prix" :value="price + ' $'" :span="2" />
      <WidgetStat name="Volume" :value="volume + ' STI'" today :span="2" />
      <WidgetStat name="Transactions" :value="transactions.today + ''" today />
      <WidgetStat name="Transactions Total" :value="transactions.total + ''" />
      <WidgetStat name="Utilisateurs" :value="users.today + ''" today />
      <WidgetStat name="Utilisateurs Total" :value="users.total + ''" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState('statistiques', [
      'price',
      'volume',
      'transactions',
      'fees',
      'users',
    ]),
  },
  mounted() {
    this.getStats()
  },
  methods: {
    ...mapActions('statistiques', ['getStats']),
  },
})
</script>
