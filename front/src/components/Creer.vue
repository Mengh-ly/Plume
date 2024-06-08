<template>
  <div class="screen flex w-full h-dvh fixed z-20 px-6 justify-center items-center">
    <div class="widget p-6 rounded bg-neutral-900 border-neutral-800 border flex flex-col w-full gap-4">
      <h1 class="text-white text-xl">Créer une tâche</h1>
      <hr class="flex w-full border-neutral-800 border my-4">
      <input type="text" name="folder" id="folder" placeholder="Dossier" class="flex w-full outline-0 p-4 rounded" v-model="folderInput">
      <select class="flex w-full outline-0 p-4 rounded" v-model="selectedFolder" v-if="!isFolderInputFilled">
        <option value="">aucun</option>
        <option v-for="folder in folders" :key="folder" :value="folder">{{ folder }}</option>
      </select>
      <hr class="flex w-full border-neutral-800 border my-4">
      <input type="text" name="title" id="title" placeholder="Tâche" class="flex w-full outline-0 p-4 rounded">
      <hr class="flex w-full border-neutral-800 border my-4">
      <span class="text-white">Durée de la tâche</span>
      <input type="date" name="date" id="date" class="p-4 rounded">
      <button class="bg-emerald-500 flex p-4 w-full items-center justify-center text-white rounded">Enregistrer</button>
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
      selectedFolder: '',
      folders: [],
      folderInput: ''
    };
  },
  mounted() {
    this.fetchFolders();
  },
  computed: {
    isFolderInputFilled() {
      return this.folderInput.trim().length > 0;
    }
  },
  watch: {
    folderInput(newVal) {
      // Réinitialise selectedFolder à "aucun" lorsque folderInput n'est plus vide
      if (newVal.trim().length > 0) {
        this.selectedFolder = '';
      }
    }
  },
  methods: {
    async fetchFolders() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      try {
        const response = await axios.post('http://localhost:3001/api/getfolder', { token });
        this.folders = response.data.dossiers;
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    }
  }
};
</script>

<style scoped>
.widget {
  max-width: 450px;
}
</style>
