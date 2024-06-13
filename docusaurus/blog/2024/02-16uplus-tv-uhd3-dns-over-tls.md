---
date: 2024-02-16T20:58
title: U+TV UHD3 DNS Over TLS
language: ko
authors:
  - revi
tags: [한국어, android, android TV, dns, dns over TLS, LGU+, tech, tv]
---

원래 3번 안 하고 4번만 해서 적용 안 돼서 왜 적용 안 되는지 찾아보던 글.

<!-- truncate -->

## 원격 접속 {#원격-접속}

(개발자 모드, ADB 승인까지는 완료했다고 가정)

1. `adb connect 192.168.*.*`
2. (TV에서 승인)
3. `adb shell settings put global private_dns_mode hostname`[^1]
4. `adb shell settings put global private_dns_specifier $HOSTNAME`
5. …
6. PROFIT!

[^1]: `hostname` 원문 그대로 쳐야 함. `hostname`을 실제 `hostname` (ie. `dns.google` 등)으로 변경하면 안 됨.
