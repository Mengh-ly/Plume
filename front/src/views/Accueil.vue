<template>
<!--  <Creer></Creer>-->
<!--  <Supprimer v-if="showDelete"></Supprimer>-->
  <Parametres v-if="showParametres"></Parametres>
  <div class="flex w-full p-6 flex-col h-dvh bg-black gap-2 relative items-center">
    <nav class="flex w-full p-4 px-6 justify-between items-center">
      <h1 class="text-white">Plume</h1>
      <h1 class="profil bg-emerald-500 text-white p-2 rounded-full cursor-pointer" @click="toggleParametres">HD</h1>
    </nav>
    <hr class="w-full flex border-zinc-800">
    <div class="tasks flex w-full flex-col gap-2 mt-2 max-w-screen-lg overflow-y-auto overflow-x-hidden">

      <small v-if="!dossiers.length" class="text-white flex w-full items-center justify-center">
        Vous n'avez pas de tâche
      </small>
      <div v-for="dossier in dossiers" :key="dossier.idDossier" class="flex flex-col gap-4">
        <small class="text-white font-black">{{ dossier.nomDossier }}</small>
        <div v-for="tache in dossier.taches" :key="tache.idTache">
          <label class="task flex w-full bg-neutral-900 px-6 p-2 rounded items-center gap-4 justify-between text-white min-h-16">
            <div class="flex items-center gap-4">
              <input type="checkbox" :checked="tache.statut === 1" class="flex w-5 h-5" @change="toggleTaskStatus(tache)">
              <span>{{ tache.nomTache }}</span>
            </div>
            <span>{{ tache.joursRestants }} jour(s)</span>
          </label>
        </div>
        <hr class="border border-neutral-900 flex w-full m-6">
      </div>
    </div>
    </div>
    <div class="btn flex gap-8 items-center justify-center fixed bottom-0 w-full mb-12 left-0 ">
      <button class="text-white p-4 bg-emerald-500 rounded items-center justify-center w-full">Créer</button>
      <button class="text-white p-4 bg-red-500 rounded items-center justify-center w-full">Supprimer</button>
    </div>
</template>

<script>
import axios from 'axios';
import Parametres from "@/components/Parametres.vue";
import Creer from "@/components/Creer.vue";
import Supprimer from "@/components/Supprimer.vue";

export default {
  name: 'Connexion',
  components: {
    Supprimer,
    Creer,
    Parametres
  },
  data() {
    return {
      showParametres: false,
      // showDelete: false,
      dossiers: []
    };
  },
  methods: {
    toggleParametres() {
      this.showParametres = !this.showParametres;
    },
    // toggleDelete() {
    //   this.showDelete = !this.showDelete;
    // },
    checkToken() {
      const token = localStorage.getItem('token');
      if (!token) {
        // Utilisation de vue-router pour la redirection sans rechargement
        this.$router.push('/');
      }
    },
    async fetchTasks() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3001/api/task', { token });
        this.dossiers = response.data;

        // Calculer les jours restants pour chaque tâche
        this.dossiers.forEach(dossier => {
          dossier.taches.forEach(tache => {
            tache.joursRestants = this.calculateDaysLeft(tache.dateLimite);
          });
        });
      } catch (error) {
        console.error('Error fetching tasks:', error);
        // Afficher un message d'erreur à l'utilisateur si nécessaire
      }
    },
    async toggleTaskStatus(tache) {
      try {
        const token = localStorage.getItem('token');
        const newStatus = tache.statut === 1 ? 0 : 1;
        const response = await axios.post('http://localhost:3001/api/taskcheckbox', {
          token,
          idTache: tache.idTache,
          statut: newStatus
        });
        if (response.data.success) {
          tache.statut = newStatus; // Met à jour le statut localement après succès
        }
      } catch (error) {
        console.error('Error toggling task status:', error);
        // Afficher un message d'erreur à l'utilisateur si nécessaire
      }
    },
    calculateDaysLeft(dateLimite) {
      const dateLimiteObj = new Date(dateLimite);
      const today = new Date();
      const timeDiff = dateLimiteObj.getTime() - today.getTime();
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return diffDays;
    }
  },
  created() {
    this.checkToken();
    this.fetchTasks();
  }
};
</script>




<style scoped>
.btn button{
  max-width: 150px;
}
</style>
