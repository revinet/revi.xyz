+++
title = 'U+TV UHD3 DNS Over TLS'
date = 2024-04-18T21:58:32+09:00
draft = false
description="문서를 잘 읽자"
+++

원래 3번 안 하고 4번만 해서 적용 안 돼서 왜 적용 안 되는지 찾아보던 글.

## 원격 접속

(개발자 모드, ADB 승인까지는 완료했다고 가정)

1. `adb connect $targetIP`
2. (TV에서 승인)
3. `adb shell settings put global private_dns_mode hostname`
4. `adb shell settings put global private_dns_specifier $HOSTNAME`
5. `…`
6. PROFIT!