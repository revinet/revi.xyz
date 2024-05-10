---
date: 2024-05-10T09:55
title: GlobalPing
description: Talking about jsdelivr's globalping
authors:
  - revi
tags: [English, jsdelivr, network, probe]
---

JsDelivr's [2024-05-02 outage](https://www.jsdelivr.com/blog/jsdelivr-may-outage-postmortem/) mentioned [GlobalPing](https://jsdelivr.com/globalping), and I took a quick look at it.

It looked pretty nice, except after about a week of sporadic tests, most of the probes there seems to be AWS, Google Cloud, Oracle, Vultr, and other datacenter network.

They do have an API that [responds with a list of all available nodes](https://www.jsdelivr.com/docs/api.globalping.io#get-/v1/probes), so let's do some calculation from this. (The full result made at <code>2024-05-10T09:19:46Z</code>, and is recorded at [P100](https://issuetracker.revi.xyz/P100).)

* datacenter-network: 832
* eyeball-network[^1]: 183
* total nodes: 1015

So, it looks like datacenter network is about 81.97% of the whole nodes, while the eyeball network is 18.03%. I wouldn't really consider 18% of nodes in regular residential/business network to be enough for measuring ordinary users' traffic.
<!-- truncate -->

In comparison, [RIPE Atlas](https://atlas.ripe.net) has 12905[^2] probes, and [their API](https://atlas.ripe.net/docs/apis/rest-api-reference/#probes)[^3] suggests there are approximately 8055 nodes[^4]. You get the size difference.

[^1]: It looks like their own description of non-datacenter'?
[^2]: [RIPE Atlas Coverage and Statistics](https://atlas.ripe.net/coverage/) has 12905 probes, HW nodes and SW nodes combined. ([Link to screenshot](atlas-screenshot.png).)
[^3]: I used `GET /api/v2/probes` with `tags=Home` param. [response](https://issuetracker.revi.xyz/P101).
[^4]: However it should be noted that, in RIPE Atlas, probe owners can freely set this tag as they wish.
