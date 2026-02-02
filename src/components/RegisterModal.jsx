import { useCallback, useEffect, useState } from "react";
import ModalWithForm from "./ModalWithForm";

const RegisterModal = ({ isOpen, onRegister, onCloseModal }) => {
  const [values, setValues] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const isValid =
    values.name.trim() &&
    values.avatar.trim() &&
    values.email.trim() &&
    values.password.trim();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const resetForm = useCallback(() => {
    setValues({
      name: "",
      avatar: "",
      email: "",
      password: "",
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    onRegister(
      {
        name: values.name.trim(),
        avatar: values.avatar.trim(),
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
      title="Sign up"
      name="signup"
      buttonText="Sign up"
      isFormValid={!!isValid}
    >
      <label className="modal__label">
        Name*
        <input
          type="text"
          className="modal__input"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
          minLength="2"
        />
      </label>

      <label className="modal__label">
        Avatar*
        <input
          type="url"
          className="modal__input"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>

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

export default RegisterModal;
