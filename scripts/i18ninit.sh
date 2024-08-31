#!/usr/bin/env bash

# SPDX-FileCopyrightText: (C) 2024 Hong Yongmin <https://revi.xyz/>
#
# SPDX-License-Identifier: Apache-2.0

echo 'config: do not overwrite existing pages'

echo 'now copying blog.'
cp -r -n blog/** i18n/ko/
