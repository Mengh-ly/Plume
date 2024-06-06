<script>
  export default {
    name:'Supprimer',
  }
</script>

<template>
  <div class="screen flex w-full h-dvh fixed z-20 px-6 justify-center items-center">
    <div class="widget p-6 rounded bg-neutral-900 border-neutral-800 border flex flex-col w-full gap-4">
      <h1 class="text-white text-xl">Confirmation</h1>
      <button class="bg-red-500 flex p-4 w-full items-center justify-center text-white rounded">Supprimer</button>
    </div>
  </div>
  <div class="flex w-full h-dvh fixed z-10"></div>
</template>

<style scoped>
  .widget{
    max-width: 450px;
  }
</style>