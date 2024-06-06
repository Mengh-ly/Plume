<template>
  <div class="flex w-full p-6 justify-center items-center flex-col h-dvh bg-black">
    <div class="widget w-full flex-col flex justify-center items-center gap-4 bg-neutral-900 p-6 rounded">
      <h1 class="text-4xl text-white">Plume</h1>
      <hr class="border w-full flex border-zinc-800 my-4">
      <div class="flex w-full gap-4">
        <input type="text" name="lastname" id="lastname" placeholder="Nom" required class="flex w-full outline-0 p-4 rounded">
        <input type="text" name="firstname" id="firstname" placeholder="Prénom" required class="flex w-full outline-0 p-4 rounded">
      </div>
      <input type="email" name="email" id="email" placeholder="Email" required class="flex w-full outline-0 p-4 rounded">
      <input type="password" name="password" id="password" placeholder="Mot de passe" required class="flex w-full outline-0 p-4 rounded">
      <button class="bg-emerald-500 flex p-4 w-full items-center justify-center text-white rounded">S'inscrire</button>
      <a href="/" class="text-white hover:underline">Vous avez déjà un compte ?</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'inscription',
  components: {
  }
}
</script>

<style scoped>
.widget{
  max-width: 450px;
}
</style>
