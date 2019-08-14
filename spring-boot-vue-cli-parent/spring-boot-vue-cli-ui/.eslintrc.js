module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/html-indent": [
      "error",
      4,
      {
        attribute: 1,
        alignAttributesVertically: true,
        ignores: []
      }
    ],
    "vue/max-attributes-per-line": [
      2,
      {
        singleline: 10,
        multiline: {
          max: 5,
          allowFirstLine: false
        }
      }
    ],
    "vue/html-self-closing": "off",
    "vue/name-property-casing": ["error", "PascalCase"],
    "prettier.jsxBracketSameLine": true,
    "editor.formatOnSave": true,
    "eslint.autoFixOnSave": true,
    "prettier/prettier": "off"
  },
  globals: {
    $: true,
    Vue: true
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
