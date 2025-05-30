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
- This list is last updated at 2024-09-02 (KST).

### prod

```plaintext
and_chr 124
and_ff 125
and_qq 14.9
and_uc 15.5
android 124
chrome 125
chrome 124
chrome 123
chrome 122
chrome 109
edge 125
edge 124
edge 123
firefox 126
firefox 125
firefox 124
firefox 115
ios_saf 17.5
ios_saf 17.4
ios_saf 17.3
ios_saf 17.2
ios_saf 17.1
ios_saf 17.0
ios_saf 16.6-16.7
ios_saf 16.5
ios_saf 16.4
ios_saf 16.3
ios_saf 16.2
ios_saf 16.1
ios_saf 16.0
ios_saf 15.6-15.8
kaios 3.0-3.1
op_mob 80
opera 109
safari 17.5
safari 17.4
samsung 24
samsung 23
```

### dev

```plaintext
chrome 128
chrome 127
chrome 126
chrome 125
chrome 124
chrome 123
firefox 129
firefox 128
firefox 127
firefox 126
firefox 125
firefox 124
firefox 123
firefox 122
firefox 115
ios_saf 17.6
ios_saf 17.5
ios_saf 17.4
ios_saf 17.3
ios_saf 17.2
ios_saf 17.1
ios_saf 17.0
safari 17.6
safari 17.5
safari 17.4
safari 17.3
safari TP
```
