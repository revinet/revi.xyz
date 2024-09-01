<!--
SPDX-FileCopyrightText: (C) 2024 Hong Yongmin (https://revi.xyz/) <yewon@revi.email>

SPDX-License-Identifier: LicenseRef-CC-BY-ND-2.0-KR
-->

---
unlisted: true
---

# WKD (Web Key Directory)

## Command to generate the correct file name {#command-to-generate-the-correct-file-name}

[Reference](https://wiki.gnupg.org/WKDHosting).

```sh
$ gpg --export 12DD5306418C8E0A8F55761D1EB4F6CEEA100E94
(File exported)
$ gpg-wks-client --print-wkd-hash ($EA100E94-mail-address)
kdyway9ebdjjxqmociyw1pemcfna8k17 ($EA100E94-mail-address)
```
