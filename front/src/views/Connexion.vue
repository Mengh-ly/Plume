<template>
  <div class="flex w-full p-6 justify-center items-center flex-col h-dvh bg-black">
    <div class="widget w-full flex-col flex justify-center items-center gap-4 bg-neutral-900 p-6 rounded">
      <h1 class="text-4xl text-white">Plume</h1>
      <hr class="border w-full flex border-zinc-800 my-4">
      <input type="email" name="email" id="email" placeholder="Email" required class="flex w-full outline-0 p-4 rounded" v-model="email">
      <input type="password" name="mdp" id="mdp" placeholder="Mot de passe" required class="flex w-full outline-0 p-4 rounded" v-model="mdp">
      <button @click="login" class="bg-emerald-500 flex p-4 w-full items-center justify-center text-white rounded">Connexion</button>
      <a href="/creation-de-compte" class="text-white hover:underline">Vous n'avez pas de compte ?</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'connexion',
  components: {
  },
  data() {
    return {
      email: '',
      mdp: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3001/api/login', {
          email: this.email,
          mdp: this.mdp
        });
        console.log('Response:', response.data);
        // Traiter la réponse ici, par exemple, en redirigeant l'utilisateur ou en stockant le token

        localStorage.setItem('token',response.data.token);

        window.location.href = '/mon-espace';

      } catch (error) {
        console.error('Erreur de connexion:', error.response ? error.response.data : error.message);
        // Gérer les erreurs ici, par exemple, en affichant un message à l'utilisateur
      }
    }
  }
}
</script>

<style scoped>
.widget{
  max-width: 450px;
}
</style>
