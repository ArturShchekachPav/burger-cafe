import type { JSX } from 'react';

import styles from './unautorized-page.module.css';

export function UnAuthorizedPage({
  title,
  form,
  links,
}: {
  title: string;
  form: JSX.Element;
  links: JSX.Element[];
}): JSX.Element {
  return (
    <div className={styles.page}>
      <h1 className={`${styles.title} text text_type_main-medium mb-6`}>{title}</h1>
      {form}
      <ul className={styles.links}>
        {links.map((link, index) => (
          <li
            key={index}
            className={`${styles.link} text text_type_main-default text_color_inactive`}
          >
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
}
