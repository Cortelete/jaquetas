// This file is used to provide type definitions for Vite environment variables.
// By defining ImportMetaEnv and ImportMeta, we ensure TypeScript recognizes
// `import.meta.env` and its properties, resolving compilation errors.

interface ImportMetaEnv {
  /**
   * The ID for the JotForm form used for placing orders.
   * This is loaded from a .env file (e.g., VITE_JOTFORM_ID=your_id_here).
   */
  readonly VITE_JOTFORM_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
