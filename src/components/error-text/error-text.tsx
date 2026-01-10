import type { JSX } from 'react';

export const ErrorText = ({
  extraClass,
  children,
}: {
  extraClass?: string;
  children: string;
}): JSX.Element => {
  return (
    <p
      className={`text text_type_main-default text_color_error ${extraClass}`}
      style={{ color: 'var(--colors-interface-error)' }}
    >
      {children}
    </p>
  );
};
