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
Hash: SHA512

# WARNING! You must include the word 'no-insurrectionists-2025'
# inside the text body to be considered.
Contact: mailto:security@revi.dev
Expires: 2025-12-31T14:59:00.000Z
Encryption: https://revi.xyz/0x50EEBEDA.asc
Preferred-Languages: ko, en
Policy: https://revi.xyz/security/
Canonical: https://revi.xyz/.well-known/security.txt
-----BEGIN PGP SIGNATURE-----
Version: GnuPG v2

iQNQBAEWCgL4FiEEep6MLz3SPfRpwsR931nuEPxZj+QFAmeFvRjCGSYAmDMEZ0G/
chYJKwYBBAHaRw8BAQdAUv25Yh03i5heCN3rfaGJBrGcyuOEfGD1ArL6wZ24BWa0
H1lvbmdtaW4gSG9uZyA8eWV3b25AcmV2aS5lbWFpbD6ImQQTFgoAQQIbAQUJBaOa
gAULCQgHAwUVCgkICwUWAgMBAAIeAQIXgBYhBFhggBJ7PHAeiwq5XwEeRVJQ7r7a
BQJnQcFIAhkBAAoJEAEeRVJQ7r7aTa8BAL70hetfqTQ1En5S/fbEy5CEHH9DYEVm
U2FnLY0j2zDvAP9PtUMjR2E31Y/d3WF8OP5CowXwsyE81g5H/F82lVYoBrgzBGdB
wBsWCSsGAQQB2kcPAQEHQAYiqnrxpRVaMSknfSwNUNUbbjl64ny8TjuuezUJqSeJ
iPUEGBYKACYWIQRYYIASezxwHosKuV8BHkVSUO6+2gUCZ0HAGwIbAgUJBaOagACB
CRABHkVSUO6+2nYgBBkWCgAdFiEEep6MLz3SPfRpwsR931nuEPxZj+QFAmdBwBsA
CgkQ31nuEPxZj+T0qwD8D4ptDq7x0K1zl5STkyr+nlnU9h7WUOuBSdYayUW+KmsB
AK+Y5C8UgCeQ/VgOh3rwtdCKL5LVVBl+dSDV9Tiv1QIFFGsBAISVNv25XvMYlP0h
KA0KAxIEHC5Wpsojfo1nxPnO/FGJAQDrLNKyunv75Rp3jQ5yby2rb9yCbOCZHiLF
P5UeV7PYD7g4BGdBwCQSCisGAQQBl1UBBQEBB0BbCB7+WYNVe5j7LRz5AzvH64bQ
kSOOYAP9jtfjWpvVXAMBCAeIfgQYFgoAJhYhBFhggBJ7PHAeiwq5XwEeRVJQ7r7a
BQJnQcAkAhsMBQkFo5qAAAoJEAEeRVJQ7r7ac3YA/R9/vqBZ/qa+vhpETcv6woOJ
vSV2vWdEnxH+ThHoyvvUAPsFU9LzlTCWbeJeYTzxll4vH9kwUq8hZFyS+aN22PzH
AwAKCRDfWe4Q/FmP5AKQAQDQQeqz7tqxkp57WCkhLGgckVx97YQe1/+jmLKVXefT
rAD+IwTV+xQbNKNF3GOMnqdJljrb48lDejZ+d5v9RQwuswo=
=3Xe5
-----END PGP SIGNATURE-----
```
