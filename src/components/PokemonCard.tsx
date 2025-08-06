

import { useState } from "react";
import { loadCollection } from "../utils/localStorageUtils";
import {IoIosAdd} from 'react-icons/io';
import {RxCross2} from 'react-icons/rx'

const PokemonCard = ({ pokemon,buttonBoolean, onAdd }: { pokemon: any;buttonBoolean:boolean; onAdd: (p: any) => void }) => {
 
    const [collection, setCollection] = useState<any[]>(loadCollection());

  return (
    <div className="pokeCard">
      <div className={"header"}>
        <div className={"iconWrapper"}>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
        <div className={"addButton"} style={{backgroundColor:buttonBoolean?"red":"#00ff00"}} onClick={() => onAdd(pokemon)}>
        { buttonBoolean ? <RxCross2/>:<IoIosAdd/>}
          </div>
      </div>

      <h2 className={'name'}>{pokemon.name}</h2>

      <div className={"types"}>
         {pokemon.types.map((t: any) =>(
          <span className={'type'}>
           {t.type.name}
          </span>
         ) )}

      </div>

      <div className={'stats'}>
        <div className={'stat'}>
          <span className={'value'}>{pokemon.stats[0].base_stat}</span>
          <span className={'label'}>HP</span>
        </div>
        <div className={'stat'}>
          <span className={"value"}>{pokemon.stats[1].base_stat}</span>
          <span className={"label"}>Attack</span>
        </div>
        <div className={"stat"}>
          <span className={"value"}>{pokemon.stats[2].base_stat}</span>
          <span className={"label"}>Defense</span>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;

