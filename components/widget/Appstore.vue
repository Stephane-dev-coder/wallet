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
      <div><span class="line-through">App</span> STI Store</div>
      <NuxtLink
        to="/store"
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
        Decouvrir <i class="bx bx-right-arrow-alt ml-2"></i>
      </NuxtLink>
    </h3>
    <div class="grid grid-rows-1 gap-4 mt-6">
      <div class="flex flex-col items-center w-32">
        <div
          class="
            h-32
            w-32
            bg-white
            rounded-2xl
            bg-white
            shadow-lg
            cursor-pointer
            transform
            duration-100
            hover:scale-105 hover:shadow-xl
            overflow-hidden
          "
        >
          <img src="/app.jpeg" alt="" />
        </div>
        <span class="text-xs mt-4">Trading PancakeSwap</span>
      </div>
    </div>
  </div>
</template>
