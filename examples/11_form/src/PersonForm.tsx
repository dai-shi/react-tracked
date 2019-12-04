/* eslint react/jsx-props-no-spreading: off */

import React from 'react';

import {
  FormProvider,
  useFormValues,
  useFormError,
  useFormField,
} from './form';

let numRendered = 0;

const validateName = (name: unknown) => {
  if (typeof name !== 'string') return new Error('invlid type');
  if (name.length === 0) return new Error('name is required');
  return null;
};

const FirstName: React.FC = React.memo(() => (
  <div>
    numRendered: {++numRendered}
    <div>
      First Name:
      <input {...useFormField('firstName', '', validateName)} />
      {useFormError('firstName')}
    </div>
  </div>
));

const FamilyName: React.FC = React.memo(() => (
  <div>
    numRendered: {++numRendered}
    <div>
      Family Name:
      <input {...useFormField('familyName', '', validateName)} />
      {useFormError('familyName')}
    </div>
  </div>
));

const Gender: React.FC = React.memo(() => (
  <div>
    numRendered: {++numRendered}
    <div>
      Gender:
      <select {...useFormField('gender', 'na')}>
        <option value="na">N/A</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      {useFormError('gender')}
    </div>
  </div>
));

const Teenager: React.FC = React.memo(() => (
  <div>
    numRendered: {++numRendered}
    <div>
      Teenager:
      <input type="checkbox" {...useFormField('teenager', false)} />
      {useFormError('teenager')}
    </div>
  </div>
));

const PersonForm: React.FC = React.memo(() => {
  const formValues = useFormValues();
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log(formValues);
  };
  return (
    <form onSubmit={onSubmit}>
      numRendered: {++numRendered}
      <button type="submit" disabled={formValues === null}>Submit</button>
      <h3>First Name</h3>
      <FirstName />
      <h3>Family Name</h3>
      <FamilyName />
      <h3>Gender</h3>
      <Gender />
      <h3>Teenager</h3>
      <Teenager />
    </form>
  );
});

const FormHolder: React.FC = () => (
  <FormProvider>
    <PersonForm />
  </FormProvider>
);

export default FormHolder;
