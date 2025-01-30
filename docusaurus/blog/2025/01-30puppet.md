---
date: 2025-01-30T20:50:23+09:00
authors: revi
title: Puppet and open source
tags: [English, License, Open Source, Puppet]
language: en
---

<!--
SPDX-FileCopyrightText: (C) 2025 Hong Yongmin (https://revi.xyz/) <yewon@revi.email>

SPDX-License-Identifier: LicenseRef-CC-BY-ND-2.0-KR
-->

# Puppet and open source

So, there's another pattern of "open-source-gone-enterprise" ending badly, after
[sourcegraph and others](/blog/2024/09/03/Sourcegraph/).

<!-- truncate -->

> In early 2025, Puppet will begin to ship any new binaries and packages
> developed by our team to a private, hardened, and controlled location.
>
> Community contributors will have free access to this private repo under
> the terms of an End-User License Agreement (EULA) for development use.
> There will be no license changes for the open source version of Puppet.
>
> [Source](https://www.puppet.com/blog/open-source-puppet-updates-2025)

So, while they are much better than their industry friends that they are
just restricting who can have their official binary, like Microsoft [VS Code](https://code.visualstudio.com/docs/supporting/faq#_why-does-visual-studio-code-have-a-different-license-than-the-vscode-github-repository),
not changing into proprietary licenses like [Redis](https://redis.io/blog/redis-adopts-dual-source-available-licensing/),
[HashiCorp](https://www.hashicorp.com/blog/hashicorp-adopts-business-source-license),
and folks (who are trying to get maximum visibility with *open source*, then when
you have enough market share (and face competition) or sold to *enterprise*,
you suddenly shut it down with non-free licenses).

> The new development license is an EULA that allows developers free access to
> our hardened Puppet releases (up to 25 nodes). Capacities higher than 25 nodes
> will require a Puppet Labs Support Commercial License.
> We will share more details on this new license option in early 2025.
>
> (Same page, just a paragraph below)

But their EULA'ed official binary is restricted to 25 nodes, and anyone above
that threshold will need to buy their commercial product.

What will they do if users do not purchase their prebuilt binary and build on
their own (or use linux distro's version like Debian/Ubuntu)? I'd suspect they will
follow others' bad example of making them proprietary.
