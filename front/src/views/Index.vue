<template>
  <div>
    <Test/>
    <p class="flex justify-center text-green-300 font-black text-4xl">Tailwind CSS</p>
  </div>
</template>

<script>
import Test from '@/components/test.vue';

export default {
  name: 'Index',
  components: {
    Test
  }
}
</script>
