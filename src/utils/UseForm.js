import React from "react";

import { emailPattern, userNamePattern } from './utils.js';

//хук управления формой
function useForm() {
  const [values, setValues] = React.useState({});

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({...values, [name]: value});
  };

  return {values, handleChange, setValues};
}

//хук управления формой и валидации формы
function useFormWithValidation(initialValues = {}) {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  function isValidEmail(value) {
    const regexp = new RegExp(emailPattern);
    return regexp.test(value);
  }

  function isValidName(value) {
    const regexp = new RegExp(userNamePattern);
    return regexp.test(value);
  }

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    if (name === 'email') {
      if (!isValidEmail(value)) {
        target.setCustomValidity("Необходимо указать e-mail в формате name@domain.zone");
      } else {
        target.setCustomValidity("");
      }
    }

    if (name === 'name') {
      if (!isValidName(value)) {
        target.setCustomValidity("Имя содержит только латиницу, кириллицу, пробел или дефис и быть длинной от 2х до 30 символов");
      } else {
        target.setCustomValidity("");
      }
    }

    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );
   

  return { values, errors, isValid, handleChange, resetForm };
}

export { useForm, useFormWithValidation };
