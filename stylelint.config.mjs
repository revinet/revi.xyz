//SPDX-FileCopyrightText: 2024 Hong Yongmin <https://revi.xyz/>
//
// SPDX-License-Identifier: Apache-2.0
/**
 * @fileoverview Stylelint configuration.
 * @copyright Hong Yongmin 2024
 * @license Apache-2.0
 * @type {import('stylelint').Config}
 */
export default {
  extends: ['stylelint-config-standard'],
  defaultSeverity: 'warning',
  ignoreFiles: ['node_modules/**', 'docusaurus/build/**'],
  rules: {
    'block-no-empty': true,
  },
};
