/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.md' {
  const value: string;
  export default value;
}

declare module 'urlify' {
  interface UrlifyOptions {
    // replaces 'ä', 'ö', and 'ü' with 'ae', 'oe', and 'ue' instead of 'a', 'o', and 'u'.
    // default: false
    addEToUmlauts?: boolean;
    // if true replaces 'ß' with 'ss', otherwise with 'sz'.
    // default: true
    szToSs?: boolean;
    // replaces whitespace characters with this character.
    // default: "_"
    spaces?: string;
    // converts all uppercase ASCII characters to lowercase.
    // default: false
    toLower?: boolean;
    // replaces other non-ASCII characters with this character.
    // default: "_"
    nonPrintable?: string;
    // replaces multiple whitespaces/non-ASCII characters by one placeholder.
    // default: false
    trim?: boolean;
    // returned result if output is reduced to an empty string.
    // default: "non-printable"
    failureOutput?: string;
  }

  interface UrlifyRootOptions extends UrlifyOptions {
    // If true, extends String object with urlify method.
    // So after calling the constructor, you can use "Hello World".urlify()
    // default: false
    extendString?: boolean;
  }

  export const create: (
    options?: UrlifyRootOptions
  ) => (value: string, options?: UrlifyOptions) => string;
}
