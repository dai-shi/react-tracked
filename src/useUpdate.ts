import {
  Context as ContextOrig,
  useContext as useContextOrig,
} from 'react';

export const useUpdate = <Update>(
  UpdateContext: ContextOrig<Update>,
) => {
  const update = useContextOrig(UpdateContext);
  return update;
};
