<template>
  <div class="bg-white shadow-lg rounded-lg p-4 col-span-2 flex flex-col">
    <h3 class="text-lg flex justify-between items-center">
      News
      <span class="text-sm text-gray-400">Quoi de neuf aujourd'hui ?</span>
    </h3>
    <div class="mt-4 grid grid-cols-3 gap-3">
      <NuxtLink to="/news/1">
        <WidgetNewsItem />
      </NuxtLink>
      <NuxtLink to="/news/2">
        <WidgetNewsItem />
      </NuxtLink>
      <NuxtLink to="/news/3">
        <WidgetNewsItem />
      </NuxtLink>
    </div>
    <div class="flex justify-end mt-4 items-center">
      <NuxtLink
        to="/news"
        class="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg"
      >
        Voir plus <i class="bx bx-right-arrow-alt ml-2"></i>
      </NuxtLink>
    </div>
  </div>
</template>
