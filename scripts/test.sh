#!/usr/bin/env bash
# Copyright 2024 Hong Yongmin
# SPDX-License-Identifier: Apache-2.0
# Run playwright test.
# Exit on error
set -e

echo 'Now starting the test script...'
echo 're-installing the playwright dependencies...'
npx playwright install --with-deps
# TODO: Plan to use locally-built docusaurus webpages.
# echo 'Cleaning the build directory for this build...'
# docusaurus clear
# echo 'Building the site...'
# docusaurus build
# if [ -d build/assets ]; then
#   echo 'Build successful!'
#   exit 0
# else
#   echo 'Build failed!'
#   exit 1
# fi

echo 'Run playwright test'
npx playwright test
echo 'Test finished!'
exit 0
