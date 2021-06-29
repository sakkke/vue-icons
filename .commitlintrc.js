const level = { disabled: 0, warning: 1, error: 2 }

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-max-line-length": [level.error, "always", Infinity],
    "scope-enum": [
      level.error,
      "always",
      ["deps", "deps-dev", "app", "feather"]
    ]
  }
}
