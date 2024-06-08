<template>
  <div class="screen flex w-full h-screen fixed z-20 px-6 justify-center items-center">
    <div class="widget p-6 rounded bg-neutral-900 border-neutral-800 border flex flex-col w-full gap-4">
      <h1 class="text-white text-xl">Créer un dossier</h1>
      <hr class="flex w-full border-neutral-800 border my-4">
      <input type="text" name="folder" id="folder" placeholder="Dossier" class="flex w-full outline-0 p-4 rounded" v-model="folderInput">
      <button @click="createFolder" class="bg-emerald-500 flex p-4 w-full items-center justify-center text-white rounded">Enregistrer</button>
      <a href="/mon-espace" class="text-white flex w-full items-center justify-center">Annuler</a>
    </div>
  </div>
  <div class="flex w-full h-screen fixed z-10"></div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Dossier',
  data() {
    return {
      folderInput: ''
    };
  },
  methods: {
    createFolder() {
      // Récupérer le token depuis le localStorage
      const token = localStorage.getItem('token');

      // Vérifier si le token est présent
      if (!token) {
        alert('Vous devez être connecté pour créer un dossier.');
        return;
      }

      // Préparer les données pour l'appel API
      const data = {
        token: token,
        nomDossier: this.folderInput
      };

      // Faire l'appel API avec Axios
      axios.post('http://localhost:3001/api/createfolder', data)
          .then(response => {
            console.log('Dossier créé avec succès:', response.data);
            // Rediriger ou afficher un message de succès
            location.reload();

          })

          .catch(error => {
            console.error('Erreur lors de la création du dossier:', error.response.data.message);
            // Afficher une erreur à l'utilisateur
          });
    }
  }
};
</script>

<style scoped>
.widget {
  max-width: 450px;
}
</style>
