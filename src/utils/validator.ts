
interface Errors {
  emailError: string | null;
  nameError: string | null;
  passwordError: string | null;
  confirmPasswordError: string | null;
}

const emailValidator = (value: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value.trim()) return "Email is required";
  return regex.test(value) ? null : "Not a valid email address";
};

const validator = () => {
  const errors: Errors = {
    emailError: null,
    nameError: null,
    passwordError: null,
    confirmPasswordError: null,
  };

  return {
    emailValidator: (value: string) => {
      errors.emailError = emailValidator(value);
    },

    nameValidator: (value: string) => {
      if (!value.trim()) errors.nameError = "Name is required";
      else if (value.trim().length < 3) errors.nameError = "Name must be at least 3 characters";
      else errors.nameError = null;
    },

    passwordValidator: (value: string) => {
      if (value.length < 6) errors.passwordError = "Password must be at least 6 characters";
      else if (!/[A-Z]/.test(value)) errors.passwordError = "Password must contain at least one uppercase letter";
      else if (!/\d/.test(value)) errors.passwordError = "Password must contain at least one number";
      else if (!/[@\-_\!#$%^&*()=+]/.test(value)) errors.passwordError = "Password must contain at least one special character";
      else errors.passwordError = null;
    },

    confirmPasswordValidator: (value: string, password: string) => {
      if (!value) errors.confirmPasswordError = "Confirm password is required";
      else if (value !== password) errors.confirmPasswordError = "Passwords do not match";
      else errors.confirmPasswordError = null;
    },

    errors: () => errors,
  };
};

export default validator;
