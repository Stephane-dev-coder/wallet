<template>
  <div class="bg-white shadow-lg rounded-lg p-4 flex flex-col col-span-1">
    <h3 class="text-lg flex justify-between items-center text-gray-500">
      Receive
    </h3>
    <div class="flex flex-col justify-center items-center flex-grow">
      <span
        class="
          w-10/12
          text-sm text-center
          break-words
          hover:text-blue-500
          transition
          duration-300
          cursor-pointer
        "
        >0x78665f6d14727401cb7ea58ef23fd5350270f365</span
      >
      <div class="flex justify-center bg-white shadow-xl p-2 rounded-xl mt-4">
        <img src="/qrcode.png" alt="" />
      </div>
      <button
        class="
          mt-6
          flex
          items-center
          bg-white
          border-2 border-black
          px-5
          py-2
          text-sm
          rounded-lg
          transition
          duration-300
          hover:text-white hover:border-transparent hover:bg-black
          focus:outline-none
          focus:text-white
          focus:bg-black
          focus:border-transparent
          focus:ring
          focus:ring-black
          focus:ring-offset-2
        "
      >
        Partager <i class="bx bxs-share-alt ml-2"></i>
      </button>
    </div>
  </div>
</template>
