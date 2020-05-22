import { create as createUrlifyInstance } from 'urlify';

export const urlify = createUrlifyInstance({
  spaces: '-',
  toLower: true,
  trim: false,
  nonPrintable: '',
});

export { createUrlifyInstance };
