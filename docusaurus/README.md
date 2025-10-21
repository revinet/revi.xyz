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

# Docusaurus

Read the [docs about workspace](https://revi.kr/Q4HciAF).

## Build

```sh
revi.xyz $ npm run build                        # or
revi.xyz $ npm run build --workspace=docusaurus # or
docusaurus $ npm run build
```

## Run local webserver

```sh
revi.xyz $ npm run dserve                       # or
revi.xyz $ npm run serve --workspace=docusaurus # or
docusaurus $ npm run serve
```

## Browserlist list

- Configuration is available at `//docusaurus/package.json` at "browserslist"
  section.
- This list was last updated at 2024-10-21 (KST).

### prod

```console
$ npx browserlists --env="production"
and_chr 141
and_ff 143
and_qq 14.9
and_uc 15.5
android 141
chrome 141
chrome 140
chrome 139
chrome 111
edge 141
edge 140
edge 139
firefox 143
firefox 142
firefox 141
firefox 140
ios_saf 26.0
ios_saf 18.5-18.6
ios_saf 18.4
ios_saf 18.3
ios_saf 18.2
ios_saf 18.1
ios_saf 18.0
kaios 3.0-3.1
op_mob 80
opera 122
safari 26.0
safari 18.5-18.6
samsung 28
```

### dev

```console
$ npx browserlist --env="development"
chrome 144
chrome 143
chrome 142
chrome 141
chrome 140
chrome 139
firefox 146
firefox 145
firefox 144
firefox 143
firefox 142
firefox 141
firefox 140
firefox 139
ios_saf 26.1
ios_saf 26.0
safari 26.1
safari 26.0
safari 18.5-18.6
safari 18.4
safari TP
```
