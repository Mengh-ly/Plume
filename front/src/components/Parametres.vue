<template>
  <div class="widget flex fixed z-10 top-0 right-0 mt-24 mr-12 rounded bg-neutral-900 p-4 w-full text-white flex-col border-neutral-800 border gap-4">
    <span>{{ nom }} {{ prenom }}</span>
    <hr class="border border-zinc-800">
    <span>{{ email }}</span>
    <a class="flex w-full p-2 bg-red-500 rounded items-center justify-center cursor-pointer" @click="logout">Déconnexion</a>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Parametres',
    data() {
      return {
        prenom: '',
        nom: '',
        email: ''
      };
    },
    methods: {
      async fetchUserData() {
        try {
          const token = localStorage.getItem('token'); // Assurez-vous que le token est stocké dans le localStorage
          const response = await axios.post('http://localhost:3001/api/user', { token });
          const userData = response.data;
          this.prenom = userData.prenom;
          this.nom = userData.nom;
          this.email = userData.email;
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      },
      async logout(){
        localStorage.removeItem("token");
        location.reload();
      }
    },
    created() {
      this.fetchUserData();
    }
  }
</script>

<style scoped>
.widget{
  max-width: 300px;
}
</style>