#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2024 Hong Yongmin <https://revi.xyz/>
#
# SPDX-License-Identifier: Apache-2.0
# Run lighthouse CI tests
# Don't exit on error
set +e

echo 'Now starting the LightHouse script...'
npm run lighthouse
exit 0
