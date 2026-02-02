import { useCallback, useEffect, useState } from "react";
import ModalWithForm from "./ModalWithForm";

const LoginModal = ({ isOpen, onLogin, onCloseModal }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const isValid = values.email.trim() && values.password.trim();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const resetForm = useCallback(() => {
    setValues({
      email: "",
      password: "",
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    onLogin(
      {
        email: values.email.trim(),
        password: values.password,
      },
      resetForm
    );
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      title="Log in"
      name="login"
      buttonText="Log in"
      isFormValid={!!isValid}
    >
      <label className="modal__label">
        Email*
        <input
          type="email"
          className="modal__input"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Password*
        <input
          type="password"
          className="modal__input"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
          minLength="6"
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
