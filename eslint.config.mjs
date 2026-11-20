import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    ".omp/**",
    ".trash/**",
    "tmp/**",
    "tmp-img/**",
  ]),
  {
    files: ["src/**/*.tsx"],
    rules: {
      // Illustrations are pre-sized WebP served as-is, so next/image would add
      // an optimizer round trip without changing the bytes. The guest photo URL
      // is user-supplied and stays a plain <img> on purpose.
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
