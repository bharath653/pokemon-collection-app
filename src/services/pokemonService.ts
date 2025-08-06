import axios from 'axios';

export const fetchPokemonList = async (offset = 0, limit = 6) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  const results = await Promise.all(
    res.data.results.map(async (pokemon: any) => {
      const details = await axios.get(pokemon.url);
      return details.data;
    })
  );
  return results;
};
