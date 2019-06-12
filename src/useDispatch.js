import { useContext } from 'react';

import { defaultContext } from './TrackedProvider';

export const useDispatch = ({
  customContext = defaultContext,
}) => {
  const { dispatch } = useContext(customContext);
  return dispatch;
};
