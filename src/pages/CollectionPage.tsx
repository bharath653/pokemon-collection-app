import { useEffect, useState } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { loadCollection, saveCollection } from '../utils/localStorageUtils';

const SortableCard = ({ pokemon }: { pokemon: any }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: pokemon.name });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} {...attributes} {...listeners} className="pokeCard" style={style}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
    </div>
  );
};

export const CollectionPage:React.FC = () => {
  const [collection, setCollection] = useState<any[]>([]);

  useEffect(() => {
    setCollection(loadCollection());
  }, []);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = collection.findIndex(p => p.name === active.id);
      const newIndex = collection.findIndex(p => p.name === over.id);
      const reordered = arrayMove(collection, oldIndex, newIndex);
      setCollection(reordered);
      saveCollection(reordered);
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={collection.map(p => p.name)} strategy={verticalListSortingStrategy}>
             <div className={"card"}>

        {collection.map(pokemon => (
          <SortableCard key={pokemon.name} pokemon={pokemon} />
        ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
