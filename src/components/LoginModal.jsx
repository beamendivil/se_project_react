import ModalWithForm from "./ModalWithForm";
import useForm from "../hooks/useForm";

const LoginModal = ({ isOpen, onLogin, onCloseModal, onSwitchToRegister }) => {
  const { values, isValid, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

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

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      title="Log in"
      name="login"
      buttonText="Log in"
      isFormValid={!!isValid}
      footerContent={
        <button
          type="button"
          className="modal__secondary-action"
          onClick={onSwitchToRegister}
        >
          or Sign Up
        </button>
      }
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
