const KEY = 'pokemon-collection';

export const loadCollection = () => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const saveCollection = (collection: any[]) => {
  localStorage.setItem(KEY, JSON.stringify(collection));
};


