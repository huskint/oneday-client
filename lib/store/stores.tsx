import { createContext, useContext } from 'react';

import userStore from '@lib/store/userStore';

const stores = {
  userStore,
};

const StoreContext = createContext(stores);

export const StoreProvider = ({ children }: any) => (
  <StoreContext.Provider value={stores}>
    {children}
  </StoreContext.Provider>
);

export const useStore = () => useContext(StoreContext);
