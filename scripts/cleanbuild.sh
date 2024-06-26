#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2024 Hong Yongmin <https://revi.xyz/>
#
# SPDX-License-Identifier: Apache-2.0
# Clean-install the dependencies and build the site
# Exit on error
set -e

echo 'Now starting the build script...'
echo 're-installing the NPM dependencies...'
npm ci
# Change to the website directory
cd docusaurus
echo 'Cleaning the build directory for this build...'
docusaurus clear
echo 'Building the site...'
docusaurus build
if [ -d build/assets ]; then
  echo 'Build successful!'
  exit 0
else
  echo 'Build failed!'
  exit 1
fi
