import {
  ChangeEvent,
  useState,
  useCallback,
  useLayoutEffect,
} from 'react';

import { createContainer, getUntrackedObject } from 'react-tracked';

type Value = string | boolean;

type State = {
  values: { [name: string]: Value };
  errors: { [name: string]: Error };
};

const initialState: State = {
  values: {},
  errors: {},
};

const {
  Provider: FormProvider,
  useTrackedState,
  useUpdate: useSetState,
} = createContainer(() => useState(initialState));

const useFormValues = () => {
  const state = useTrackedState();
  const formValues = getUntrackedObject(state.values);
  const hasErrors = Object.keys(state.errors).length > 0;
  if (hasErrors) return null;
  return formValues;
};

const useFormError = (name: string) => {
  const state = useTrackedState();
  const err = state.errors[name];
  return err ? err.message : '';
};

const useFormField = (
  name: string,
  initialValue: Value = '',
  validate?: (value: Value) => Error | null,
) => {
  const state = useTrackedState();
  const setState = useSetState();
  const updateValue = useCallback((value: Value) => {
    const err = validate && validate(value);
    setState((prev) => {
      const nextValues = { ...prev.values };
      const nextErrors = { ...prev.errors };
      if (err) {
        delete nextValues[name];
        nextErrors[name] = err;
      } else {
        nextValues[name] = value;
        delete nextErrors[name];
      }
      return { values: nextValues, errors: nextErrors };
    });
  }, [name, validate, setState]);
  useLayoutEffect(() => {
    updateValue(initialValue);
  }, [initialValue, updateValue]);
  const onChange = useCallback((
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { target } = event;
    let value: Value;
    if (target.type === 'checkbox') {
      value = (target as HTMLInputElement).checked;
    } else {
      value = target.value;
    }
    updateValue(value);
  }, [updateValue]);
  return {
    value: String(state.values[name] || initialValue),
    checked: Boolean(state.values[name] || initialValue),
    onChange,
  };
};

export {
  FormProvider,
  useFormValues,
  useFormError,
  useFormField,
};
