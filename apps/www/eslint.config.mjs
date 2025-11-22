import js from "@eslint/js"
import next from "eslint-plugin-next"
import tseslint from "typescript-eslint"

export default [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      ".source/**",
    ],
  },

  js.configs.recommended,

  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,

  {
    plugins: {
      next,
    },
    rules: {
      "@next/next/no-duplicate-head": "off",
    },
  },
]
