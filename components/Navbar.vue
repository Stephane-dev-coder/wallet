<template>
  <div
    class="
      flex flex-row
      bg-white
      items-center
      h-14
      px-4
      border-b border-gray-200
    "
  >
    <div class="w-1/2 text-lg font-semibold text-gray-700">
      <NuxtLink to="/">STI2D Wallet</NuxtLink>
    </div>
    <div class="w-1/2 flex flex-row justify-end">
      <button
        class="
          flex
          justify-center
          items-center
          h-10
          w-10
          mr-4
          rounded
          transition
          duration-300
          hover:bg-gray-100
          text-lg
        "
      >
        <i class="bx bx-moon"></i>
      </button>
      <button
        class="
          flex
          justify-center
          items-center
          h-10
          w-10
          mr-6
          rounded
          transition
          duration-300
          hover:bg-gray-100
          text-lg
          focus:text-white focus:bg-black
        "
      >
        <i class="bx bx-bell"></i>
      </button>
      <button
        class="
          bg-white
          border-2 border-black
          px-5
          py-2
          text-sm
          rounded-lg
          transition
          duration-300
          hover:text-white hover:border-transparent hover:bg-black
          focus:text-white
          focus:bg-black
          focus:border-transparent
          focus:ring
          focus:ring-black
          focus:ring-offset-2
        "
      >
        Connnect Wallet
      </button>
    </div>
  </div>
</template>
