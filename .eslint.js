module.exports = {
    "extends": ["@eduzz/eslint-config"],
    "plugins": ["sonarjs"],
    "rules": {
      "@typescript-eslint/explicit-member-accessibility": "off",
      "max-lines": ["error", 5000],
      "@typescript-eslint/ban-ts-comment": "off",
      "padding-line-between-statements": [
        "error",
        { "blankLine": "always", "prev": ["block-like", "function"], "next": "*" },
        { "blankLine": "always", "prev": ["*"], "next": ["block-like", "function"] },
        { "blankLine": "any", "prev": ["const", "let", "var"], "next": ["const", "let", "var"] },
        { "blankLine": "any", "prev": ["export", "import"], "next": ["export", "import"] },
        { "blankLine": "any", "prev": ["const", "let", "var"], "next": ["export"] }
      ]
    }
  }