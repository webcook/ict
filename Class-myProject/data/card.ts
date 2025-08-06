import { PokemonCard } from '../types/card';

export const pokemonCards: PokemonCard[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `포켓몬 ${i + 1}`,
  image: `/pockecard/pockemon${(i % 15) + 1}.webp`,
}));
