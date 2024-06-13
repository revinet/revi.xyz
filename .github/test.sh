#!bin/bash
# Copyright 2024 Hong Yongmin
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
  echo 'Serving the site...'
  docusaurus serve
else
  echo 'Build failed!'
  exit 1
fi