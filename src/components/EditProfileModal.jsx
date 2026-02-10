import { useContext, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import useForm from "../hooks/useForm";

const EditProfileModal = ({ isOpen, onCloseModal, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, isValid, handleChange, resetForm } = useForm({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen) {
      const nextValues = {
        name: currentUser?.name || "",
        avatar: currentUser?.avatar || "",
      };
      const nextIsValid =
        nextValues.name.trim() && nextValues.avatar.trim();

      resetForm(nextValues, {}, !!nextIsValid);
    }
  }, [isOpen, currentUser, resetForm]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    onUpdateUser(
      {
        name: values.name.trim(),
        avatar: values.avatar.trim(),
      },
      resetForm
    );
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      title="Change profile data"
      name="edit-profile"
      buttonText="Save changes"
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
    </ModalWithForm>
  );
};

export default EditProfileModal;
