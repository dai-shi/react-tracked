import { useContext } from 'react';

import { UPDATE_CONTEXT_PROPERTY } from './createProvider';

export const createUseUpdate = (context) => {
  const useUpdate = () => {
    const { [UPDATE_CONTEXT_PROPERTY]: update } = useContext(context);
    return update;
  };
  return useUpdate;
};
