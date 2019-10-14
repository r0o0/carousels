<template lang="pug">
  #app
    h3.title Carousel
    Carousel
    DeleteForm
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import dataJSON from '@/assets/data.json';

import DeleteForm from '@/components/DeleteForm.vue';
import Carousel from '@/components/Carousel.vue';

const { mapActions } = createNamespacedHelpers('carousel');

export default {
  name: 'app',
  components: {
    DeleteForm,
    Carousel,
  },
  methods: {
    ...mapActions(['setSlides']),
  },
  created() {
    this.setSlides(dataJSON);
  },
};
</script>

<style scoped lang="scss">
#app {
  padding: 40px 0;
}
.title {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}
</style>
