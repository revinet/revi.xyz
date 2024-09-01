#!/usr/bin/env bash

# SPDX-FileCopyrightText: (C) 2024 Hong Yongmin (https://revi.xyz/) <yewon@revi.email>
#
# SPDX-License-Identifier: Apache-2.0
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Runs all the lint scripts

# Continue on error
set +e

echo 'We assume npm packages are installed. It will error without `npm ci`.'
echo 'We also assume you built the docusaurus site because it will also fail'
echo 'without one.'
sleep 5
if [ ! -d "node_modules" ]; then
  echo 'node_modules not found. Please run `npm ci` first.'
  exit 1
fi
if [ ! -d "docusaurus/build" ]; then
  echo 'build not found. Please run `npm run dbuild` first.'
  exit 1
fi
echo 'Starting the linting process...'

echo 'Checking if arc is installed...'
if command -v arc &> /dev/null; then
  echo 'arc is installed. Running arc lint now...'
  arc lint
else
  echo 'arc is not installed, skipping...'
fi

echo 'Running eslint check now...'
npm run lint:eslint

echo 'Running html-validate check now...'
npm run lint:html-validate

echo 'Running prettier check now...'
npm run p:c .

echo 'Running renovate-config-validator now...'
npm run lint:renovate

echo 'Running stylelint check now...'
npm run lint:stylelint

echo 'Linting process completed successfully!'
exit 0
