<!--
SPDX-FileCopyrightText: (C) 2024 Hong Yongmin (https://revi.xyz/) <yewon@revi.email>

SPDX-License-Identifier: Apache-2.0

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

# revi.xyz

Source code for revi.xyz.

This deploys to Cloudflare Pages, unlike most of the repos in this org.
See [meta](https://revi.xyz/meta/) for detailed info.

## Builds

<!-- prettier-ignore -->
| Workflow | Badge |
| ---- | ---- |
| Deploy site | ![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/revinet/revi.xyz/cloudflare-pages.yml?branch=prod&logo=github) |
| Test site | ![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/revinet/revi.xyz/cloudflare-pages.yml?branch=master&logo=github) |
| lint #1 | ![Azure Pipelines Build Status](https://revinim.visualstudio.com/reviNet-Public/_apis/build/status%2Frevi.xyz?branchName=master) |

## Copyright Headers

(Ref [T200](https://revi.xyz/bug/200).)

Use `reuse annotate` command to generate SPDX copyright header.

```bash
$ reuse annotate -l Apache-2.0 --copyright-prefix spdx-c -c "Hong Yongmin (https://revi.xyz/) <yewon@revi.email>" --skip-unrecognised -t (html|js|php|python) (path)
```
