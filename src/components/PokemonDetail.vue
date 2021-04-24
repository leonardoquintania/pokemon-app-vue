<template>
  <Button label="Voltar" @click="back" />
  <loader v-if="isLoading" />
  <div v-if="info">
    <div class="div-row">
      <img :src="image" :alt="info.name" />
      <h1>{{ info.name }}</h1>
    </div>
    <div class="div-row">
      <h4>Experiência:</h4>
      {{ info.base_experience }}
    </div>
    <div class="div-row">
      <h4>Peso:</h4>
      {{ info.weight }}
    </div>
    <div class="div-row">
      <h4>Altura:</h4>
      {{ info.height }}
    </div>
    <div class="div-images">
      <div v-for="(value, key, index) in info.sprites" :key="index">
        <img
          v-if="value && typeof value === 'string'"
          :src="value"
          alt="info.name"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Loader from './Loader';
import { getPokemon, getPokemonImageUrl } from '../services/pokemon-service.js';
export default {
  components: { Loader },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { id } = route.params;
    const info = ref(null);
    const isLoading = ref(false);

    onMounted(async () => {
      isLoading.value = true;
      const pokemon = await getPokemon(id);
      info.value = pokemon;
      isLoading.value = false;
    });
    const image = computed(() => getPokemonImageUrl(info.value.id));

    const back = () => router.replace('/');

    return { router, info, image, isLoading, back };
  },
};
</script>

<style scoped>
.div-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.div-images {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>
