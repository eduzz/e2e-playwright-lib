const { ignores, configs } = require('@eduzz/eslint-config'); // Javascript / Typescript / Node

/** @type import('eslint').Linter.FlatConfig[] */
module.exports = [...configs, { ignores: ignores() }];
