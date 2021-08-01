<template>
  <div class="h-40 lg:h-20 w-full relative">
    <textarea
      class="
        dark:bg-dark-4
        resize-none
        h-full
        w-full
        mt-2
        p-2
        rounded-lg
        border
        dark:border-dark-4
        focus:outline-none focus:ring-2
        relative
        dark:text-gray-200
      "
      maxlength="240"
      placeholder="Merci pour l'extincteur !"
      type="text"
      :value="content"
      @input="handleInput"
    />
    <div
      class="
        absolute
        bottom-0
        right-0
        text-xs
        mr-2
        mb-1
        rounded
        p-1
        bg-gray-100 bg-opacity-70
        dark:bg-dark-2 dark:bg-opacity-90 dark:text-white
        font-bold
      "
      :class="{ 'ring-2': error, 'ring-red-400': error }"
    >
      {{ size }}/240
    </div>
    <p class="text-xs text-red-500 mt-1" :class="{ invisible: !error }">
      {{ message }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface Data {
  content: string
}

export default Vue.extend<Data, any, any, any>({
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      content: this.value,
      error: false,
      message: '',
    }
  },
  computed: {
    size() {
      return this.content.length
    },
  },
  methods: {
    handleInput(e: any) {
      this.content = e.target.value
      this.$emit('input', e.target.value)
    },
  },
})
</script>
