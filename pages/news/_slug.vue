<template>
  <div>Vous checher la new {{ slug }}</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  asyncData({ params }) {
    const slug = params.slug
    return { slug }
  },
})
</script>
