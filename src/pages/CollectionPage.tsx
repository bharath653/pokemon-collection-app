import { useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { loadCollection, saveCollection } from '../utils/localStorageUtils';

// Individual draggable card component for each Pokémon
const SortableCard = ({ pokemon }: { pokemon: any }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: pokemon.name }); // Hook to make the item sortable

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="pokeCard"
      style={style}
    >
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
    </div>
  );
};

// Main collection page component
export const CollectionPage: React.FC = () => {
  const [collection, setCollection] = useState<any[]>([]); // State to hold Pokémon collection

  useEffect(() => {
    // Load the collection from local storage when component mounts
    setCollection(loadCollection());
  }, []);

  // Setup drag-and-drop sensors
  const sensors = useSensors(useSensor(PointerSensor));

  // Handler when drag ends
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    // If the position has changed
    if (active.id !== over.id) {
      const oldIndex = collection.findIndex((p) => p.name === active.id);
      const newIndex = collection.findIndex((p) => p.name === over.id);

      // Reorder the collection and update both state and local storage
      const reordered = arrayMove(collection, oldIndex, newIndex);
      setCollection(reordered);
      saveCollection(reordered);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={collection.map((p) => p.name)}
        strategy={verticalListSortingStrategy}
      >
        <div className="card">
          {collection.map((pokemon) => (
            <SortableCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
