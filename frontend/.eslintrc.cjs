module.exports = {
  "root": true,
  "env": {
    "es6": true,
    "node": true,
  },
  "extends": ["eslint:recommended", "plugin:prettier/recommended"],
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "parser": "@typescript-eslint/parser",
    "sourceType": "module",
  },
  "plugins": ["simple-import-sort"],
  "rules": {
    // allow debugger during development only
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // Sorting imports
    "simple-import-sort/imports": [
      "error",
      {
        "groups": [
          // Type imports come first.
          ["^[^.].+\\u0000$", "^.*\\u0000$"],
          // External (not @/ and @/f)
          ["^(?!(components|@f\\/))@?\\w+"],
          // Mock imports.
          ["^.*\\.json$"],
          // Internal packages.
          [
            "^@/",
            "^@f/(.*)/composables",
            "^@f/(.*)/directives",
            "^@f/(.*)/utils",
            "^@f/",
            "^\\.(?!/?$)",
            "^\\./(?=.*/)(?!/?$)",
            "^\\./?$",
          ],
          // Components
          ["^vuetify/components", ".*\\.vue$"],
          // Style imports.
          ["^.+\\.s?css$"],
        ],
      },
    ],
    "simple-import-sort/exports": "error",
  },
  "overrides": [
    {
      "files": ["*.ts"],
      "plugins": ["@typescript-eslint"],
      "extends": ["plugin:@typescript-eslint/recommended", "plugin:@typescript-eslint/stylistic"],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "project": ["./tsconfig.json"],
      },
    },
    {
      "files": ["*.vue"],
      "extends": [
        "@vue/eslint-config-typescript",
        "plugin:vue/vue3-essential",
        "plugin:vue/vue3-strongly-recommended",
        "plugin:vue/vue3-recommended",
      ],
      "rules": {
        "quote-props": [2, "consistent-as-needed"],
        "vue/block-lang": ["error", { "script": { "lang": "ts" } }],
        "vue/component-api-style": ["error", ["script-setup"]],
        // Allow self-closing for void html elements, eg. <br /> <hr />
        "vue/html-self-closing": ["error", { "html": { "void": "always" } }],
        // Enforce proper slot names, but allow modifiers for Vuetify. e.g. table.slot-name
        "vue/valid-v-slot": ["error", { "allowModifiers": true }],
        "no-unused-vars": "off",
        // conflicts with prettier
        "vue/singleline-html-element-content-newline": "off",
        // Ensure consistent case for
        "vue/component-name-in-template-casing": [
          "error",
          "kebab-case",
          { "registeredComponentsOnly": false },
        ],
      },
    },
    {
      "files": [".eslintrc.js"],
      "rules": { "quote-props": [2, "always"] },
    },
  ],
};
