#!/usr/bin/env bash

# SPDX-FileCopyrightText: (C) 2024 Hong Yongmin <https://revi.xyz/>
#
# SPDX-License-Identifier: Apache-2.0

# Clean the build directory, build the site, and serve it
# Exit on error
set -e

echo 'Now starting the build script...'
# Change to the website directory
cd docusaurus
echo 'Cleaning the build directory for this build...'
docusaurus clear
echo 'Building the site...'
docusaurus build
if [ -d build/assets ]; then
  echo 'Build successful!'
  echo 'Serving the site via wrangler...'
  cd ../
  npx wrangler pages dev docusaurus/build/ --port 3000
else
  echo 'Build failed!'
  exit 1
fi
