import { useContext } from 'react';

import { defaultContext } from './Provider';

export const createUseDispatch = customContext => () => {
  const { dispatch } = useContext(customContext);
  return dispatch;
};

export const useDispatch = createUseDispatch(defaultContext);
