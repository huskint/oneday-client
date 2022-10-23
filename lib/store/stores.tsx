import { createContext, useContext } from 'react';

const stores = {};

const storeContext = createContext(stores);

export const storeProvider = ({ children }: any) => {
  <storeContext.Provider value={stores}>
    {children}
  </storeContext.Provider>;
};

export const useStore = () => useContext(storeContext);
