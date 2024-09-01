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
