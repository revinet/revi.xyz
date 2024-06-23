#!/usr/bin/env bash
# Copyright 2024 Hong Yongmin
# SPDX-License-Identifier: Apache-2.0
# Runs all the lint scripts

# Continue on error
set +e

echo 'Starting the linting process...'
echo 'Running renovate-config-validator now...'
npx renovate-config-validator

echo 'Checking if arc is installed...'
if command -v arc &> /dev/null; then
  echo 'arc is installed. Running arc lint now...'
  arc lint
else
  echo 'arc is not installed, skipping...'
fi

echo 'Running prettier check now...'
npx prettier --check .

echo 'Running eslint check now...'
cd docusaurus
npx eslint .
echo 'Linting process completed successfully!'
exit 0
