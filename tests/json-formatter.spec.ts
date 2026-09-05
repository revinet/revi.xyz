/*
 * SPDX-FileCopyrightText: (C) 2026 Hong Yongmin (https://revi.xyz/) <yewon@revi.email>
 * SPDX-License-Identifier: Apache-2.0
 */

import {test, expect} from '@playwright/test';

test.describe('JSON formatter', () => {
  test.use({baseURL: 'http://127.0.0.1:9090'});

  test('Formats JSON, changes indentation, and recovers from invalid input', async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/jq/');

    const workspace = page.getByRole('region', {
      name: 'JSON formatting workspace',
    });
    const input = workspace.getByRole('textbox', {name: 'JSON input'});
    const output = workspace.getByLabel('Formatted JSON', {exact: true});
    const copy = workspace.getByRole('button', {name: 'Copy', exact: true});
    const empty = workspace.getByText('Your formatted JSON will appear here.', {
      exact: true,
    });

    await expect(empty).toBeVisible();
    await expect(copy).toBeDisabled();
    await input.fill('{"hello":"world","nested":{"valid":true}}');
    // textContent preserves whitespace, which is the formatter's output.
    await expect(output).toHaveJSProperty(
      'textContent',
      '{\n  "hello": "world",\n  "nested": {\n    "valid": true\n  }\n}',
    );
    await expect(copy).toBeEnabled();

    await workspace.getByRole('radio', {name: '4', exact: true}).check();
    await expect(output).toHaveJSProperty(
      'textContent',
      '{\n    "hello": "world",\n    "nested": {\n        "valid": true\n    }\n}',
    );
    await workspace.getByRole('radio', {name: 'Tab', exact: true}).check();
    await expect(output).toHaveJSProperty(
      'textContent',
      '{\n\t"hello": "world",\n\t"nested": {\n\t\t"valid": true\n\t}\n}',
    );

    await workspace
      .getByRole('spinbutton', {
        name: 'Custom indentation level, 0 to 10 spaces',
      })
      .fill('0');
    await expect(
      workspace.getByRole('radio', {name: 'Custom', exact: true}),
    ).toBeChecked();
    await expect(output).toHaveJSProperty(
      'textContent',
      '{"hello":"world","nested":{"valid":true}}',
    );

    await input.fill('{"hello":}');
    await expect(workspace.getByRole('alert')).toContainText('Invalid JSON');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(output).toHaveCount(0);
    await expect(copy).toBeDisabled();

    await workspace.getByRole('button', {name: 'Load sample'}).click();
    await expect(input).toHaveValue(/JSON Formatter/);
    await expect(output).toContainText('JSON Formatter');
    await expect(workspace.getByRole('alert')).toHaveCount(0);
    await expect(input).toHaveAttribute('aria-invalid', 'false');
    await expect(copy).toBeEnabled();

    await workspace.getByRole('button', {name: 'Clear', exact: true}).click();
    await expect(input).toHaveValue('');
    await expect(output).toHaveCount(0);
    await expect(empty).toBeVisible();
    await expect(copy).toBeDisabled();
    expect(errors).toEqual([]);
  });
});
