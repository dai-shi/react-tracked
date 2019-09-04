import { useContext } from 'react';

export const createUseUpdate = context => () => {
  const { update } = useContext(context);
  return update;
};
