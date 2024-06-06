<template>
<!--  <Creer></Creer>-->
<!--  <Supprimer></Supprimer>-->
  <Parametres v-if="showParametres"></Parametres>
  <div class="flex w-full p-6 flex-col h-dvh bg-black gap-2 relative items-center">
    <nav class="flex w-full p-4 px-6 justify-between items-center">
      <h1 class="text-white">Plume</h1>
      <h1 class="profil bg-emerald-500 text-white p-2 rounded-full cursor-pointer" @click="toggleParametres">HD</h1>
    </nav>
    <hr class="w-full flex border-zinc-800">
    <div class="tasks flex w-full flex-col gap-2 mt-2 max-w-screen-lg overflow-y-auto overflow-x-hidden">
      <small class="text-white flex w-full items-center justify-center">Vous n'avez pas de tâche</small>
      <small class="text-white font-black">Sport</small>
      <label for="check" class="task flex w-full bg-neutral-900 px-6 p-2 rounded items-center gap-4 text-white min-h-16">
        <input type="checkbox" name="check" id="check" class="flex w-5 h-5" checked>
        <span>Faire 20 pompes</span>
      </label>
      <label for="check" class="task flex w-full bg-neutral-900 px-6 p-2 rounded items-center gap-4 text-white min-h-16">
        <input type="checkbox" name="check" id="check" class="flex w-5 h-5" checked>
        <span>50 squats</span>
      </label>
      <hr class="border border-neutral-900 flex w-full m-6">
      <small class="text-white font-black">Chambre</small>
      <label for="check" class="task flex w-full bg-neutral-900 px-6 p-2 rounded items-center gap-4 text-white min-h-16">
        <input type="checkbox" name="check" id="check" class="flex w-5 h-5">
        <span>Faire le lit</span>
      </label>
      <label for="check" class="task flex w-full bg-neutral-900 px-6 p-2 rounded items-center gap-4 text-white min-h-16">
        <input type="checkbox" name="check" id="check" class="flex w-5 h-5">
        <span>Passer l'aspirateur</span>
      </label>
      <hr class="border border-neutral-900 flex w-full m-6">
      <label for="check" class="task flex w-full bg-neutral-900 px-6 p-2 rounded items-center gap-4 text-white min-h-16">
        <input type="checkbox" name="check" id="check" class="flex w-5 h-5">
        <span>Déposer la lettre à la poste</span>
      </label>
      <label for="check" class="task flex w-full bg-neutral-900 px-6 p-2 rounded items-center gap-4 text-white min-h-16">
        <input type="checkbox" name="check" id="check" class="flex w-5 h-5">
        <span>Faire les courses</span>
      </label>
    </div>
    <div class="btn flex gap-8 items-center justify-center fixed bottom-0 w-full mb-12 left-0 ">
      <button class="text-white p-4 bg-emerald-500 rounded items-center justify-center w-full">Créer</button>
      <button class="text-white p-4 bg-red-500 rounded items-center justify-center w-full">Supprimer</button>
    </div>
  </div>
</template>

<script>
import Test from '@/components/Parametres.vue';
import Parametres from "@/components/Parametres.vue";
import Creer from "@/components/Creer.vue";
import Supprimer from "@/components/Supprimer.vue";

export default {
  name: 'connexion',
  components: {
    Supprimer,
    Creer,
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
    },
    checkToken() {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/';
      }
    }
  },
  created() {
    this.checkToken();
  }
}
</script>

<style scoped>
.btn button{
  max-width: 150px;
}
</style>
