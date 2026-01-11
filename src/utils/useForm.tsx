import { useCallback, useMemo, useState } from 'react';

type FieldState<T = unknown> = {
  error?: string;
  value: T;
  isDirty?: boolean;
};

export function useForm<T extends Record<string, unknown>>(
  initialValues: T
): {
  fields: { [K in keyof T]: FieldState<T[K]> };
  setValue: <K extends keyof T>(name: K, value: T[K]) => void;
  setError: <K extends keyof T>(name: K, error?: string) => void;
  isValid: boolean;
  isDirty: boolean;
  isAllDirty: boolean;
  reset: () => void;
  handleSubmit: (
    callback: (data: T) => void
  ) => (e: React.FormEvent<HTMLFormElement>) => void;
} {
  type FieldsType = { [K in keyof T]: FieldState<T[K]> };

  const initialState = useMemo(() => {
    const result = {} as FieldsType;

    Object.keys(initialValues).forEach((key) => {
      const k = key as keyof T;
      result[k] = {
        value: initialValues[k],
        isDirty: false,
      };
    });

    return result;
  }, [initialValues]);

  const [fields, setFields] = useState<FieldsType>(initialState);

  const isValid = Object.values<FieldState<unknown>>(fields).every(
    (field) => !field.error
  );
  const isAllDirty = Object.values<FieldState<unknown>>(fields).every(
    (field) => field.isDirty
  );
  const isDirty = Object.values<FieldState<unknown>>(fields).some(
    (field) => field.isDirty
  );

  const setField = useCallback(
    <K extends keyof T>(name: K, data: Partial<FieldState<T[K]>>) => {
      setFields((prev) => ({
        ...prev,
        [name]: { ...prev[name], ...data },
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (
      callback: (data: T, e: React.FormEvent<HTMLFormElement>) => void
    ): ((e: React.FormEvent<HTMLFormElement>) => void) => {
      return (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const formData = {} as T;

        Object.keys(fields).forEach((key) => {
          const k = key as keyof T;
          formData[k] = fields[k].value;
        });

        callback(formData, e);
      };
    },
    [fields]
  );

  const setValue = useCallback(
    <K extends keyof T>(name: K, value: T[K]) => {
      setField(name, { value, isDirty: value === initialValues[name] ? false : true });
    },
    [setField, initialValues]
  );

  const setError = useCallback(
    <K extends keyof T>(name: K, error?: string) => {
      setField(name, { error });
    },
    [setField]
  );

  const reset = useCallback(() => {
    setFields(initialState);
  }, [initialState]);

  return {
    fields,
    isValid,
    isAllDirty,
    isDirty,
    handleSubmit,
    setValue,
    setError,
    reset,
  };
}
