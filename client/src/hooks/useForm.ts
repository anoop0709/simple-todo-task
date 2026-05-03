import { useState } from "react";
import type { ChangeEvent } from "react";

type Errors<T> = Partial<Record<keyof T, string>>;
type Touched<T> = Partial<Record<keyof T, boolean>>;

type UseFormProps<T> = {
  initialValues: T;
  validate: (values: T) => { errors: Errors<T>; isValid: boolean };
  onSubmit: (values: T) => Promise<void> | void;
};

export function useForm<T extends Record<string, unknown>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [touched, setTouched] = useState<Touched<T>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const setFieldValue = <K extends keyof T>(field: K, value: T[K]) => {
    const newValues = { ...values, [field]: value };
    setValues(newValues);

    const { errors } = validate(newValues);
    setErrors(errors);
  };

  const handleBlur = <K extends keyof T>(field: K) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);

    const { errors, isValid } = validate(values);
    setErrors(errors);

    if (!isValid) return;

    await onSubmit(values);
  };

  const getTextFieldProps = <K extends keyof T>(field: K) => ({
    value: (values[field] ?? "") as string,
    onChange: (e: ChangeEvent<HTMLInputElement>) =>
      setFieldValue(field, e.target.value as T[K]),
    onBlur: () => handleBlur(field),
    error: (touched[field] || isSubmitted) && !!errors[field],
    helperText:
      (touched[field] || isSubmitted) ? (errors[field] as string) : "",
  });

  return {
    values,
    errors,
    touched,
    isSubmitted,
    setFieldValue,
    handleBlur,
    handleSubmit,
    getTextFieldProps,
  };
}