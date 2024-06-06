<script>
  export default {
    name:'Creer',
  }
</script>

<template>
  <div class="screen flex w-full h-dvh fixed z-20 px-6 justify-center items-center">
    <div class="widget p-6 rounded bg-neutral-900 border-neutral-800 border flex flex-col w-full gap-4">
      <h1 class="text-white text-xl">Créer une tâche</h1>
      <hr class="flex w-full border-neutral-800 border my-4">
      <input type="text" name="folder" id="folder" placeholder="Dossier" class="flex w-full outline-0 p-4 rounded">
      <select class="flex w-full outline-0 p-4 rounded">
        <option value="">aucun</option>
      </select>
      <hr class="flex w-full border-neutral-800 border my-4">
      <input type="text" name="title" id="title" placeholder="Tâche" class="flex w-full outline-0 p-4 rounded">
      <div class="date text-white flex gap-8 w-full flex-wrap">
        <div class="flex items-center gap-2">
          <input type="checkbox" name="lun" id="lun">
          <label for="lun">Lundi</label>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" name="mar" id="mar">
          <label for="mar">Mardi</label>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" name="mer" id="mer">
          <label for="mer">Mercredi</label>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" name="jeu" id="jeu">
          <label for="jeu">Jeudi</label>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" name="ven" id="ven">
          <label for="ven">Vendredi</label>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" name="sam" id="sam">
          <label for="sam">Samedi</label>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" name="dim" id="dim">
          <label for="dim">Dimanche</label>
        </div>
      </div>
      <hr class="flex w-full border-neutral-800 border my-4">
      <span class="text-white">Durée de la tâche</span>
      <input type="date" name="date" id="date" class="p-4 rounded">
      <button class="bg-emerald-500 flex p-4 w-full items-center justify-center text-white rounded">Enregistrer</button>
    </div>
  </div>
  <div class="flex w-full h-dvh fixed z-10"></div>
</template>

<style scoped>
  .widget{
    max-width: 450px;
  }
</style>