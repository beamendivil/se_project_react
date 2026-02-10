import { useState, useCallback, useRef } from "react";

const useForm = (initialValues = {}) => {
  const initialFormValues = useRef(initialValues).current;
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { name, value, validationMessage, validity } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationMessage,
    }));

    const form = event.target.closest("form");
    setIsValid(form ? form.checkValidity() : validity.valid);
  };

  const resetForm = useCallback(
    (nextValues = initialFormValues, nextErrors = {}, nextIsValid = false) => {
      setValues(nextValues);
      setErrors(nextErrors);
      setIsValid(nextIsValid);
    },
    [initialFormValues]
  );

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
    setValues,
    setErrors,
    setIsValid,
  };
};

export default useForm;
