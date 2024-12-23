---
title: Security Policy
description: Security Policy
unlisted: true
---

<!--
SPDX-FileCopyrightText: (C) 2024 Hong Yongmin (https://revi.xyz/) <yewon@revi.email>

SPDX-License-Identifier: LicenseRef-CC-BY-2.0-KR
-->

# Security Policy

## Contact software authors first

Generally, I do not run custom-built software. Therefore your first point of
contact should be the original author/maintainer of the software which you found
the vulnerability. For example, `revi.xyz` (This website) runs on
[Cloudflare Pages](https://pages.cloudflare.com) server, statically-generated
files from [docusaurus](https://docusaurus.io). You should be contacting
[Cloudflare](https://www.cloudflare.com/.well-known/security.txt) or
[Meta Platforms](https://www.facebook.com/.well-known/security.txt) to disclose
the problem.

Only after the patch is generally available, and I have not patched the software
in due time (allow me about 2 weeks, I do things for a hobby, not for my job)
then contact me for the vulnerability.

## Reporting a Vulnerability

After reading above, if you are still certain if you discovered a security bug
that falls within **MY** responsibility, then contact me.

Use the contact details at [security.txt](https://revi.xyz/.well-known/security.txt).

:::warning[Report Validation]

You must include this word `blanc.security.revi.xyz` in your report body,
or I will consider the report invalid.

:::

Please note that I do not offer financial rewards.

```txt title="security.txt.asc"
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

# WARNING: You must include the word 'blanc.security.revi.xyz'
# inside the text body to be considered.
Contact: mailto:security@revi.dev
Expires: 2024-12-31T14:59:00.000Z
Encryption: https://revi.xyz/0xEA100E94.asc
Preferred-Languages: ko, en
Canonical: https://revi.xyz/.well-known/security.txt
-----BEGIN PGP SIGNATURE-----

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
SQwhnus=
=wS7s
-----END PGP SIGNATURE-----
```
