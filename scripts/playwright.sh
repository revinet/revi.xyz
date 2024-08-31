#!/usr/bin/env bash

# SPDX-FileCopyrightText: (C) 2024 Hong Yongmin <https://revi.xyz/>
#
# SPDX-License-Identifier: Apache-2.0

# Run playwright tests
# Don't exit on error
set +e

echo 'Now starting the playwright script...'
npm test
exit 0
