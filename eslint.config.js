import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

const globals = {
  browser: {
    fetch: true,
    document: true,
    window: true,
    self: true,
    console: true,
    setTimeout: true,
    setInterval: true,
    clearTimeout: true,
    clearInterval: true,
    requestAnimationFrame: true,
    navigator: true,
    history: true,
    localStorage: true,
  },
};

export default defineConfig(
  {
    ignores: ["**/dist/**", "**/bundle/**", "**/node_modules/**", "./*.ts"],
  },
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      globals: {
        ...globals.browser,
        expect: true,
        it: true,
        describe: true,
        hljs: true,
      },
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
    ],
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "@typescript-eslint/consistent-type-assertions": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@stylistic/member-delimiter-style": [
        "error",
        {
          multiline: { delimiter: "none", requireLast: false },
          singleline: { delimiter: "semi", requireLast: false },
        },
      ],
      "@stylistic/semi": ["error", "never"],
      "@stylistic/quotes": ["error", "single"],
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/max-len": ["warn", { code: 320 }],

      "no-debugger": "error",
      "no-unused-labels": "off",
      "no-unused-vars": "off",
      "no-var": "error",
      eqeqeq: "error",
      strict: "error",
    },
  },
);
