<template>
  <Parametres v-if="showParametres"></Parametres>
  <div class="flex w-full p-6 flex-col h-dvh bg-black gap-2 relative">
    <nav class="flex w-full p-4 px-6 justify-between items-center">
      <h1 class="text-white">Plume</h1>
      <h1 class="profil bg-emerald-500 text-white p-2 rounded-full cursor-pointer" @click="toggleParametres">HD</h1>
    </nav>
    <hr class="w-full flex border-zinc-800">
    <div class="tasks flex w-full flex-col gap-2 mt-2">
      <small class="text-white flex w-full items-center justify-center">Vous n'avez pas de tâche</small>
    </div>
    <div class="btn flex gap-8 items-center justify-center fixed bottom-0 w-full mb-12 left-0">
      <button class="text-white p-4 bg-emerald-500 rounded items-center justify-center w-full">Créer</button>
      <button class="text-white p-4 bg-red-500 rounded items-center justify-center w-full">Supprimer</button>
    </div>
  </div>
</template>

<script>
import Test from '@/components/Parametres.vue';
import Parametres from "@/components/Parametres.vue";

export default {
  name: 'connexion',
  components: {
    Parametres
  },
  data() {
    return {
      showParametres: false
    }
  },
  methods: {
    toggleParametres() {
      this.showParametres = !this.showParametres;
    }
  }
}
</script>

<style scoped>
.btn button{
  max-width: 150px;
}
</style>
