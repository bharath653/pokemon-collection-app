import { useEffect, useState } from 'react';
import { DiscoverPage } from './pages/DiscoverPage';
import { CollectionPage } from './pages/CollectionPage';
import { FaSearch } from 'react-icons/fa';
import { MdCollectionsBookmark } from 'react-icons/md';
import { loadCollection } from './utils/localStorageUtils';

function App() {
  // State to track current active tab - either 'discover' or 'collection'
  const [tab, setTab] = useState<'discover' | 'collection'>('discover');

  // State to hold the list of collected Pokemons from localStorage
  const [collection, setCollection] = useState<any[]>(loadCollection());

  // Reload collection from localStorage whenever component mounts or loadCollection() updates
  useEffect(() => {
    setCollection(loadCollection());
  }, [loadCollection()]); 

  return (
    <div className="app-container">
      <h1 className="app-title">🔥 Pokemon Collection App</h1>
      <p>Discover, collect, and organize your favorite Pokemon!</p>
      <div className="tab-buttons">
        <button className="discover-btn" onClick={() => setTab('discover')}>
          <FaSearch style={{ marginRight: '8px' }} />
          Discover Pokemons
        </button>
        <button className="collection-btn" onClick={() => setTab('collection')}>
          <MdCollectionsBookmark style={{ marginRight: '8px' }} />
          My Collection ({collection.length}) 
        </button>
      </div>

      {/* Conditional rendering based on selected tab */}
      <div className="main-page">
        {tab === 'discover' ? <DiscoverPage /> : <CollectionPage />}
      </div>
    </div>
  );
}

export default App;
