import { useEffect, useState } from 'react';
import { DiscoverPage } from './pages/DiscoverPage';
import { CollectionPage } from './pages/CollectionPage';
import {FaSearch} from 'react-icons/fa';
import {MdCollectionsBookmark} from 'react-icons/md'
import { loadCollection } from './utils/localStorageUtils';

function App() {
  const [tab, setTab] = useState<'discover' | 'collection'>('discover');
  const [collection, setCollection] = useState<any[]>(loadCollection());
  useEffect(()=>{
    setCollection(loadCollection());
  },[loadCollection()])
  return (
    <div className="app-container">
      <h1 className="app-title">🔥 Pokemon Collection App</h1>
      <div className="tab-buttons">
        <button className='discover-btn' onClick={() => setTab('discover')}>
           <FaSearch style={{ marginRight: '8px' }} />
          Discover Pokemons</button>
        <button className='collection-btn' onClick={() => setTab('collection')}>
        <MdCollectionsBookmark style={{ marginRight: '8px' }} />
          My Collection({collection.length})</button>
      </div>
      <div className='main-page'>
      {tab === 'discover' ? <DiscoverPage /> : <CollectionPage />}
      </div>
    </div>
  );
}

export default App;
