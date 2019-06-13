import { useContext } from 'react';

import { defaultContext } from './TrackedProvider';

export const useDispatch = (opts = {}) => {
  const {
    customContext = defaultContext,
  } = opts;
  const { dispatch } = useContext(customContext);
  return dispatch;
};
