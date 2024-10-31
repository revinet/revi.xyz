---
title: email domains
description: revi's email-only domains.
unlisted: true
---

<!--
SPDX-FileCopyrightText: (C) 2024 Hong Yongmin (https://revi.xyz/) <yewon@revi.email>

SPDX-License-Identifier: LicenseRef-CC-BY-2.0-KR
-->

# email domains

If you are redirected to this page, you were trying to access web page for
my email-only domains.

These email-only domains only send email from authorized people
(mostly me, my family members, some close friends of mine, and some
project-related people) and their emails are properly authenticated with SPF
and DKIM, and enforced via DMARC
(most of the domains have `p=quarantine` or `p=reject` policy).

As of 2024-10-31, I send emails from following providers:

- [Fastmail](https://fastmail.com/)
- [Google Workspace](https://workspace.google.com/)
- [Postmark](https://www.postmarkapp.com/)

## Abuse

However, if you received unauthorized emails from domains which connections are
redirected to this page, email me using the address below and I'll investigate.

:::warning[Full email headers required]

You need to supply full header and texts for me to investigate.

:::

:::info[Email address]

First, visit [this page](https://go.dev/play).

Then, paste the code below to the yellow edit box,
and click the "Run" at right side.

```go title="main.go"
// SPDX-SnippetBegin
// SPDX-SnippetCopyrightText: Copyright 2023 The Go Authors.
// SPDX-License-Identifier: BSD-3-Clause

package main

import "fmt"

func ReverseRunes(s string) string {
  r := []rune(s)
  for i, j := 0, len(r)-1; i < len(r)/2; i, j = i+1, j-1 {
    r[i], r[j] = r[j], r[i]
  }
  return string(r)
}

func main() {
  fmt.Println(ReverseRunes("ved.iver@con"))
}
// SPDX-SnippetEnd
```

Grey box below the yellow edit box will emit the correct email address and say
`Program exited`. ([Example here](https://revi.xyz/img/emailexample.png).
The source code is from [go.dev](https://go.googlesource.com/example/+/refs/heads/master/hello/reverse/reverse.go)
and licensed under a [BSD license](https://go.dev/LICENSE).)
You can also [click this link](https://go.dev/play/p/YWTUM2CFGxD) to get this
prefilled.
Just click the "Run" button.

:::
