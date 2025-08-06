import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPokemonList } from '../services/pokemonService';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { useEffect, useState } from 'react';
import { loadCollection, saveCollection } from '../utils/localStorageUtils';
import PokemonCard from '../components/PokemonCard';
import Spinner from '../components/spinner';

export const DiscoverPage: React.FC = () => {
  // Load the saved collection from localStorage (or empty array if none found)
  const [collection, setCollection] = useState<any[]>(loadCollection());

  // React Query hook to handle infinite loading of Pokémon list
  const {
    data,
    fetchNextPage,         
    isFetchingNextPage,    
    hasNextPage,      
  } = useInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: ({ pageParam = 0 }) => fetchPokemonList(pageParam), 
    getNextPageParam: (_, pages) => pages.length * 6, 
  });

  // Hook for infinite scroll, triggers fetch when scrolling reaches the end
  const loaderRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  });

  // Add or remove a Pokémon from the local collection
  const handleAdd = (pokemon: any) => {
    let updated;

    // If Pokémon already exists, remove it
    if (collection.flat().some(obj => obj.name === pokemon.name)) {
      updated = collection.filter(item => item.name !== pokemon.name);
    } else {
      // Else, add Pokémon and ensure no duplicates
      updated = [...collection, pokemon].filter(
        (p, i, self) => self.findIndex(x => x.name === p.name) === i
      );
    }

    // Update state and localStorage
    setCollection(updated);
    saveCollection(updated);
  };

  return (
    <div className='main-poke'>
      <div className="card">
        {data?.pages.flat().map((pokemon: any) => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            onAdd={handleAdd}
            buttonBoolean={collection.flat().some(obj => obj.name === pokemon.name)}
          />
        ))}
      </div>
      <div ref={loaderRef}>
        {isFetchingNextPage && <Spinner />}
      </div>
    </div>
  );
};
