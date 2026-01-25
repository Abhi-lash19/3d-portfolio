import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // Global ignores
  globalIgnores([
    "dist",
    "node_modules",
    ".vite",
    "coverage",
    "tailwind.config.js",
    "postcss.config.js",
    "vite.config.js",
  ]),

  // Main React + JS rules
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "unused-imports": unusedImports,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // Base recommended rules
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,

      // Hooks best-practice
      ...reactHooks.configs.recommended.rules,

      // React 17+ doesn't need React import in JSX
      "react/react-in-jsx-scope": "off",

      // Since React 17+ also doesn't need PropTypes in modern stacks
      // (use TS for props checking instead)
      "react/prop-types": "off",

      // Force remove unused imports (production standard)
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { vars: "all", varsIgnorePattern: "^[A-Z_]", argsIgnorePattern: "^_" },
      ],

      // Keep this warning - helps avoid Vite refresh issues
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },

  // React Three Fiber / Drei JSX override (needed)
  {
    files: ["src/components/canvas/**/*.{js,jsx}"],
    rules: {
      // Three.js uses custom JSX props like position/rotation/intensity etc.
      "react/no-unknown-property": "off",
    },
  },
]);
