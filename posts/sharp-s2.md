---
title: Sharp S2 玩机
date: "2023-08-08"
tags: 
  - Sharp S2
  - Root
  - Magisk
  - Lineage OS
  - Android
categories:
  - 教程
---

Sharp s2 这部手机跟死了一样。

<!--more-->

sharp s2 是夏普 2017 年发布的手机，全面屏确实很吸引人，但是丐版 ss2 4+64 在当今是有些力不从心。刷机之前用默认的安卓 8 的 Smile UX，装个 qq 都卡的要命。在 xda 上找了个 [lineageos 17.1 的包](https://forum.xda-developers.com/t/lineage-17-1-unofficial-for-fih-sat-ss2-hh1-hh6-hd1-drg.3996951/)，给刷了 。

## 解 bl
 
sharp s2 解 bl 还是用[光卡](https://forum.xda-developers.com/t/guide-how-to-use-hctsw-care-uu4-to-unlock-the-bootloader.4600037/)更好，更简单，还能自动 root，很不错，但是没有 twrp（在解 bl 时出现的那个似乎是直接 boot 的）。

教程在链接中都有，就不多说了，但要注意用光卡解 bl 之前，必须要[提交你手机的 PSN](https://hikaricalyx.com/request-bootloader-unlock/)，否则会提示订单未找到。

## 刷 lineageos 17.1

如果你用上面的 lineageos 17.1 的包，一定要先 ota 更新到最新的版本（安卓 8.0.0）

上面 xda 的链接里有个 google drive 的分享，里面有一堆压缩包，我这里是选了 `LOS17.1-20200225-beta-S2-S3_2.zip` 这个包，里面有三个 img，一个 boot，一个 system，一个 vendor。

为了避免安装驱动，可以直接使用光卡内的 adb 和 fastboot，即 `光卡目录/bin/系统名（windows 为 win32，linux 为 linux，macos 为 darwin）` 内的 exe，也就是直接在这个文件夹打开 cmd.

刷机过程没什么好说的，先用 adb 重启进 bootloader 模式（手机上显示的似乎是 `download mode`）:

```sh
adb reboot bootloader
```

然后用 fastboot 查看连接：

```sh
fastboot devices
```

一般来说，用完光卡解 bl，bl 应该会已经打开，为了确保成功，可以试一试：

```sh
fastboot flashing unlock
```

然后直接开始线刷：

```sh
fastboot flash boot boot.img
fastboot flash system system.img
fastboot flash vendor vendor.img
```

上面 `*.img` 记得换成 img 的实际路径。

然后完成线刷，重启：

```sh
fastboot continue
```

重启后，完成 lineageos 的设置即可。

## root

如今 root 的最好方案似乎是 kernelSU，但无论是默认的 SmileUX 还是我们刷的 lineageos 17 都不是 GKI 内核，也就是没有 kernelSU 的官方支持，网上也没有编译好的内核，所以我们还是选择面具 magisk。

首先将之前刷入的 `boot.img` 传至手机，方式任意，可网站分享，可蓝牙分享，也可直接 usb 复制进手机。

在手机上下载安装并打开 magisk，点击最上面的 install 按钮（magisk 的而非 app 的），之后点击 `选择并修补一个文件` ，找到之前传入手机的 `boot.img`，选择。

然后在手机的下载文件夹中找到刚才 magisk 产生的 img 文件（通常是 `magisk_patched-xxxx.img`）,传到电脑上，方式也任选。

随后将手机再次重启到 bootloader（用上面的命令），再次刷入新的 boot.img（将文件名替换成你自己的）：

```sh
fastboot flash boot magisk_patched-xxxx.img
```

然后再次重启：

```sh
fastboot continue
```

重启之后，再次打开 magisk app，再次点击刚才最上面的 install 按钮。这一次选择 `直接安装`，并重启，你就拥有一台 root 的类原生的 lineageos 的安卓 10 机器了。

## magisk 配置、模块

详见 [Magisk Root 后的玩法](/post/7e66437a2f0f/)