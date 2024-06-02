<template>
  <div class="widget flex fixed z-10 top-0 right-0 mt-24 mr-12 rounded bg-neutral-900 p-4 w-full text-white flex-col border-neutral-800 border gap-4">
    <span>Hervé Duong</span>
    <hr class="border border-zinc-800">
    <span>mon.email@gmail.com</span>
    <a href="" class="flex w-full p-2 bg-red-500 rounded items-center justify-center">Déconnexion</a>
  </div>
</template>

<script>
  export default {
    name: 'Parametres',
  }
</script>

<style scoped>
.widget{
  max-width: 300px;
}
</style>