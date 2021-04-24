<template>
  <h1>Pokemon App</h1>
  <loader v-if="isLoading" />
  <div
    class="div-pokemon"
    v-for="(pokemon, index) in list"
    @click="selectedPokemon(pokemon.id)"
    :key="index"
  >
    <img :src="getPokemonImage(pokemon.id)" :alt="pokemon.name" />
    {{ pokemon.name }}
  </div>
</template>

<script>
import {
  getPokemonList,
  getPokemonImageUrl,
} from '../services/pokemon-service';
import Loader from './Loader';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const list = ref([]);
    const router = useRouter();
    const isLoading = ref(false);

    onMounted(async () => {
      isLoading.value = true;
      const pokemons = await getPokemonList();
      list.value = pokemons.results.map((pokemon) => {
        return { name: pokemon.name, id: getPokemonId(pokemon.url) };
      });
      isLoading.value = false;
    });

    const selectedPokemon = (id) => {
      router.push({ name: 'pokemon', params: { id } });
    };

    // onMounted(() => {
    //   getPokemonList().then((resp) => {
    //     list.value = resp.results.map((pokemon) => {
    //       return { name: pokemon.name, id: getPokemonId(pokemon.url) };
    //     });
    //     console.log(list.value);
    //   });
    // });

    const getPokemonId = (url) => {
      return parseInt(
        url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '')
      );
    };

    const getPokemonImage = (id) => getPokemonImageUrl(id);

    return { list, isLoading, getPokemonImage, getPokemonId, selectedPokemon };
  },
  components: { Loader },
};
</script>

<style scoped>
.div-pokemon {
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 0.2rem;
  margin: 0.5rem;
  cursor: pointer;
}
</style>
