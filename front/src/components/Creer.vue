<template>
  <div class="screen flex w-full h-dvh fixed z-20 px-6 justify-center items-center">
    <div class="widget p-6 rounded bg-neutral-900 border-neutral-800 border flex flex-col w-full gap-4">
      <h1 class="text-white text-xl">Créer une tâche</h1>
      <hr class="flex w-full border-neutral-800 border my-4">
      <span class="text-white ">Choix du dossier</span>
      <select class="flex w-full outline-0 p-4 rounded" v-model="selectedFolder">
<!--        <option value="null">Aucun</option>-->
        <option v-for="(folder, index) in folders" :key="index" :value="folder">{{ folder.nomDossier }}</option>
      </select>
      <hr class="flex w-full border-neutral-800 border my-4">
      <input type="text" name="title" id="title" placeholder="Tâche" class="flex w-full outline-0 p-4 rounded" v-model="taskName">
      <hr class="flex w-full border-neutral-800 border my-4">
      <span class="text-white">Date limite de la tâche</span>
      <input type="date" name="deadline" id="deadline" class="p-4 rounded" v-model="taskDeadline">
      <button @click="createTask" class="bg-emerald-500 flex p-4 w-full items-center justify-center text-white rounded">Enregistrer</button>
      <a href="/mon-espace" class="text-white flex w-full items-center justify-center">Annuler</a>
    </div>
  </div>
  <div class="flex w-full h-dvh fixed z-10"></div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedFolder: null,
      folders: [],
      taskName: '',
      taskDeadline: ''
    };
  },
  mounted() {
    this.fetchFolders();
  },
  methods: {
    async fetchFolders() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      try {
        const response = await axios.post('http://localhost:3001/api/getfolder', {token});
        this.folders = response.data.dossiers;
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    },
    async createTask() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      if (!this.selectedFolder) {
        console.error('No folder selected');
        return;
      }

      const idDossier = this.selectedFolder.idDossier;
      const nomTache = this.taskName.trim();
      const dateLimite = this.taskDeadline;

      console.log('Selected idDossier:', idDossier); // Affichage de l'idDossier sélectionné

      try {
        const response = await axios.post('http://localhost:3001/api/createtask', {
          idDossier,
          nomTache,
          dateLimite,
          token
        });
        console.log('Task created successfully:', response.data);
        // Optionnel : Redirection ou affichage d'un message de confirmation
      } catch (error) {
        console.error('Error creating task:', error);
      }
    },

  }
};
</script>

<style scoped>
.widget {
  max-width: 450px;
}
</style>
