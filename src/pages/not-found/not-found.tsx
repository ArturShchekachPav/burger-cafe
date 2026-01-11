import { ErrorPage } from '@/components/error-page/error-page';
import { routes } from '@/utils/constants';

import type { JSX } from 'react';

export function NotFound(): JSX.Element {
  return <ErrorPage code="404" content="Страница не найдена" backlinkTo={routes.HOME} />;
}
