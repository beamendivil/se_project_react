import ModalWithForm from "./ModalWithForm";
import useForm from "../hooks/useForm";

const RegisterModal = ({
  isOpen,
  onRegister,
  onCloseModal,
  onSwitchToLogin,
}) => {
  const { values, isValid, handleChange, resetForm } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

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

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      title="Sign up"
      name="signup"
      buttonText="Sign up"
      isFormValid={!!isValid}
      footerContent={
        <button
          type="button"
          className="modal__secondary-action"
          onClick={onSwitchToLogin}
        >
          or Log In
        </button>
      }
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
