<template>
  <div
    class="
      bg-white
      shadow-lg
      rounded-lg
      p-4
      col-span-1
      md:col-span-2
      lg:col-span-4
      flex flex-col
    "
  >
    <h3 class="text-lg flex justify-between items-center">
      News
      <NuxtLink
        to="/news"
        class="
          flex
          items-center
          px-3
          py-2
          hover:bg-gray-100
          rounded-lg
          text-sm
          focus:text-white
          focus:bg-black
          focus:ring
          focus:ring-black
          focus:ring-offset-2
          focus:outline-none
          transition
          duration-300
        "
      >
        Voir plus <i class="bx bx-right-arrow-alt ml-2"></i>
      </NuxtLink>
    </h3>
    <div
      class="
        mt-4
        grid grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        gap-3
      "
    >
      <NuxtLink
        to="/news/1"
        class="
          focus:ring focus:ring-black focus:ring-offset-2 focus:outline-none
          rounded-xl
        "
      >
        <WidgetNewsItem />
      </NuxtLink>
      <NuxtLink
        to="/news/2"
        class="
          focus:ring focus:ring-black focus:ring-offset-2 focus:outline-none
          rounded-xl
        "
      >
        <WidgetNewsItem />
      </NuxtLink>
      <NuxtLink
        to="/news/3"
        class="
          focus:ring focus:ring-black focus:ring-offset-2 focus:outline-none
          rounded-xl
        "
      >
        <WidgetNewsItem />
      </NuxtLink>
      <NuxtLink
        to="/news/4"
        class="
          focus:ring focus:ring-black focus:ring-offset-2 focus:outline-none
          rounded-xl
        "
      >
        <WidgetNewsItem />
      </NuxtLink>
      <NuxtLink
        to="/news/5"
        class="
          focus:ring focus:ring-black focus:ring-offset-2 focus:outline-none
          rounded-xl
        "
      >
        <WidgetNewsItem />
      </NuxtLink>
    </div>
  </div>
</template>
