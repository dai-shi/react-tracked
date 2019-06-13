import { useContext } from 'react';

import { defaultContext } from './Provider';

export const useDispatch = (opts = {}) => {
  const {
    customContext = defaultContext,
  } = opts;
  const { dispatch } = useContext(customContext);
  return dispatch;
};
