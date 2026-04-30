export type AuthErrors = {
  email?: string;
  name?: string;
  password?: string;
  confirmPassword?: string;
};
type ValidateInput = {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
};

export type ValidateResult = {
  isValid: boolean;
  errors: AuthErrors;
  cleanEmail: string;
  cleanName: string;
  cleanPassword: string;
  cleanConfirmPassword: string;
};

export const sanitizeEmail = (value: string) =>
  value.trim().toLowerCase();

export const sanitize = (value: string) =>
  value.trim();

export const validateInput = ({
  email,
  password,
  name,
  confirmPassword,
}: ValidateInput): ValidateResult => {
  const errors: AuthErrors = {};

  const cleanEmail = sanitizeEmail(email);
  const cleanPassword = sanitize(password);
  const cleanConfirmPassword = confirmPassword ? sanitize(confirmPassword) : "";
  const cleanName = name ? sanitize(name) : "";

  if (!cleanEmail) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    errors.email = "Enter a valid email";
  }
  if (name !== undefined) {
    if (!cleanName) {
      errors.name = "Name is required";
    } else if (cleanName.length < 3) {
      errors.name = "Name must be at least 3 characters";
    }
  }

  if (!cleanPassword) {
    errors.password = "Password is required";
  } else if (cleanPassword.length < 8) {
    errors.password = "Minimum 8 characters required";
  } else if (!/[A-Z]/.test(cleanPassword)) {
    errors.password = "At least one uppercase letter required";
  } else if (!/[a-z]/.test(cleanPassword)) {
    errors.password = "At least one lowercase letter required";
  } else if (!/[0-9]/.test(cleanPassword)) {
    errors.password = "At least one number required";
  } else if (!/[!@#$%^&*]/.test(cleanPassword)) {
    errors.password = "At least one special character required";
  }

  if (confirmPassword !== undefined) {
    if (!cleanConfirmPassword) {
      errors.confirmPassword = "Confirm your password";
    } else if (cleanPassword !== cleanConfirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    cleanEmail,
    cleanName,
    cleanPassword,
    cleanConfirmPassword,
  };
};

export const normalizeDate = (value: string): string | undefined => {
  if (!value) return undefined;

  const parsed = new Date(value);

  if (isNaN(parsed.getTime())) return undefined;

  return parsed.toISOString();
};

export const formatDate = (iso?: string | null): string => {
  if (!iso) return "-";

  const date = new Date(iso);

  if (isNaN(date.getTime())) return "-";

  const today = new Date();
  const isToday =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  if (isToday) return "Today";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};