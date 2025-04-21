import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier/flat"

// Rules that shouldn't apply to the configuration file:
/* eslint quotes: 0 */
/* eslint @stylistic/quote-props: 0 */
/* eslint @stylistic/max-len: 0 */

export default defineConfig([
  globalIgnores([

    // Webpack configuration files are exempt
    "webpack.**.**",

  ]),
  { files: ["**/*.{js,mjs,cjs}"] },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  eslintConfigPrettier,
  {
    plugins: { "@stylistic": stylistic },

    rules: {
      // ESLint Stylistic Plugin Rules:
      // These are commented out as they conflict with Prettier
      // You can "uncomment" them if you don't use Prettier but still want stylistic rules
      // "@stylistic/quote-props": ["warn", "as-needed"],
      // "@stylistic/space-before-function-paren": ["warn", { "anonymous": "always", "named": "never", "asyncArrow": "always" }],
      // "@stylistic/space-before-blocks": "warn",
      // "@stylistic/function-paren-newline": ["warn", "multiline"],
      // "@stylistic/arrow-spacing": "warn",
      // "@stylistic/arrow-parens": ["warn", "always"],
      // "@stylistic/implicit-arrow-linebreak": ["warn", "beside"],
      // "@stylistic/object-curly-newline": ["warn", { "multiline": true }],

      // Long strings are exempt from this rule, and shouldn't be broken up
      "@stylistic/max-len": ["warn", { "code": 80 }],

      "@stylistic/no-mixed-operators": "warn",
      // "@stylistic/nonblock-statement-body-position": ["warn", "beside"],
      // "@stylistic/brace-style": ["warn", "1tbs", { "allowSingleLine": true }],
      "@stylistic/spaced-comment": ["warn", "always"],
      // "@stylistic/space-infix-ops": "warn",
      // "@stylistic/eol-last": ["warn", "always"],
      // "@stylistic/newline-per-chained-call": ["warn", { "ignoreChainWithDepth": 2 }],
      // "@stylistic/no-whitespace-before-property": "warn",
      // "@stylistic/padded-blocks": ["warn", { "blocks": "never" }],
      // "@stylistic/no-multiple-empty-lines": ["warn", { "max": 2, "maxBOF": 0 }],
      // "@stylistic/space-in-parens": ["warn", "never"],
      // "@stylistic/array-bracket-spacing": ["warn", "never"],
      // "@stylistic/object-curly-spacing": ["warn", "always"],
      // "@stylistic/block-spacing": "warn",
      // "@stylistic/comma-spacing": ["warn", { "before": false, "after": true }],
      // "@stylistic/computed-property-spacing": ["warn", "never"],
      // "@stylistic/key-spacing": ["warn", { "beforeColon": false, "afterColon": true, "mode": "strict" }],
      // "@stylistic/no-trailing-spaces": "warn",
      // "@stylistic/comma-style": ["warn", "last"],
      // "@stylistic/comma-dangle": ["warn", "always-multiline"],

      // Prevents potential errors caused by Automatic Semicolon Insertion
      // "@stylistic/semi": ["error", "always"],


      // Might be obtrusive => change to "off" if it is
      "prefer-const": "warn",

      "no-var": "error",
      "no-object-constructor": "error",
      "object-shorthand": "warn",
      "prefer-object-spread": "warn",
      "no-array-constructor": "error",
      "prefer-destructuring": "warn",
      "quotes": ["warn", "single"],
      "prefer-template": "warn",

      // Commented due to conflicting with Prettier - Enable if not using Prettier
      // "template-curly-spacing": ["warn", "never"],

      // "eval()" can open an application to vulnerabilities
      "no-eval": "error",

      // Similar to "eval()"
      "no-new-func": "error",

      "no-useless-escape": "warn",
      "func-names": ["error", "as-needed"],
      "no-loop-func": "error",
      "prefer-rest-params": "error",

      // Might not work as expected
      "camelcase": "error",

      "default-param-last": "error",
      "prefer-spread": "error",
      "prefer-arrow-callback": "error",
      "arrow-body-style": ["error", "as-needed"],
      "no-useless-constructor": "error",
      "class-methods-use-this": "error",
      "no-duplicate-imports": "error",

      // Can switch to: "dot-notation": ["warn", { "allowKeywords": false }]
      "dot-notation": "warn",

      "prefer-exponentiation-operator": "warn",
      "no-undef": "error",

      // "never" ensures variable declarations are split
      "one-var": ["error", "never"],

      "no-multi-assign": "error",

      // Used due to potential errors caused by automatic semicolon insertions
      "no-plusplus": "error",

      "no-use-before-define": "error",
      "eqeqeq": "error",
      "no-nested-ternary": "error",
      "no-unneeded-ternary": "error",
      "no-else-return": ["warn", { allowElseIf: false }],
      "no-new-wrappers": "error",
      "radix": "error",

      // Exceptions: "e" for event listeners, "a" and "b" for sorting arrays
      "id-length": ["error", { "exceptions": ["e", "a", "b"] }],

      // Includes options you might want to add
      "new-cap": "error",

      "no-underscore-dangle": "warn",
      'no-restricted-globals': [
      'error',
      {
        name: 'isFinite',
        message:
          'Use Number.isFinite instead https://github.com/airbnb/javascript#standard-library--isfinite',
      },
      {
        name: 'isNaN',
        message:
          'Use Number.isNaN instead https://github.com/airbnb/javascript#standard-library--isnan',
      },
    ],
    },
  },
]);
