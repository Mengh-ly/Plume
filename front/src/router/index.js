import { createRouter, createWebHistory } from 'vue-router'
import Connexion from '../views/Connexion.vue'
import Inscription from "@/views/Inscription.vue";
import Accueil from "@/views/Accueil.vue";

const routes = [
  {
    path: '/',
    name: 'connexion',
    component: Connexion
  },
  {
    path: '/creation-de-compte',
    name: 'inscription',
    component: Inscription
  },
  {
    path: '/mon-espace',
    name: 'accueil',
    component: Accueil
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
