---
title: Magisk root 后的玩法
date: 2023-08-12
tags: 
  - Sharp S2
  - Root
  - Magisk
  - Lineage OS
  - Android
categories:
  - 安利
---

最近把手里的一台 sharp s2 给刷了 lineageos 17，也上了 magisk。

<!--more-->

root，玩安卓跟 linux的应该都知道，就是系统的最高权限，理论上可以对手机做任何你想做的事，这里就略微说一下 root 之后能干什么神奇而又~~没啥用~~的事。

## 模块

magisk 的模块是一大特色，这里选几个我使用的模块，前三个是我自认为的必装模块。

### LSPosed

这个就是 xposed 一个代替，能够通过给应用加 hooks 来修改应用行为，简称lsp~~老色批~~有 riru 和 zygisk 两种方案，目前更推荐 `zygisk` 这种方案，设置里没有开启 zygisk 的要先开启。

lsp 内置模块仓库，可以很便捷的进行模块的安装，我只安装了 `QAuxiliary` 这一个模块（qq 增强）

### Shamiko

这是一个用来隐藏 root 的模块，一般是使用 whitelist 白名单模式，详细教程可自行搜索。使用 shamiko 时务必注意不要开启 zygisk 设置中的 `遵守排除列表`。

> 用了 shamiko 的话，你在给新应用授权 root 时，就需要关闭 shamiko，再重启，比较麻烦。所以建议在你预计所有使用 root 的应用都装完后再安装它。这里放在第二个只是因为它被广泛使用。

### 自动神仙救砖

一个自动救砖模块，会检测你是否卡开机，如果是会自动禁用所有模块并重新尝试开机。为了安全与稳定，我认为这是必刷模块。

> 我希望你永远用不到，但我希望你能一直安装并开启着它。

***

接下来就是可选模块了，看个人需求。

### Twemoji replacer

默认的 emoji 比较丑，刷这个包可以使用推特~~X~~的 emoji 来替换默认系统中的，当然仅限于本机。

### xmlpak

google play 中有许多比较好的 oem 应用，但是非本厂的应用你是看不到的，这个应用能让你看得到、下得了。

### Lookie75 Product Sans Font

类原生系统中一般没有主题商店，默认字体比较丑，刷入这个包可以使用 google product sans，也就是现在新安卓的字体。

### gboard user\_dict\_3\_3 词库

一个 gboard 输入法词库，比较全面。

## 软件

root，软件也是一个重要部分的啦（

### 爱玩机工具箱

酷安发现的宝藏应用，~~可以看出作者是想迎合 material you 的~~，主要就是使用 root 权限对设备进行管理，功能比较全面，像 apk 安装器，命令执行器，应用卸载器都是有的。

### Shizuku

也是一种权限管理器，可以通过 root 激活，能够给其他应用一种低于 root，类似 adb 的权限，通过它可以更好的管理 root 的使用~~毕竟你也不能啥应用都给 root 吧~~

### 雹

一种类似冰箱的程序冻结器，免费开源，建议通过 shizuku 进行激活。

### MT 管理器

一个文件管理器，功能强大，但 ui 丑陋，而且部分功能须充钱。但还是一个不错的文件管理器，也可以使用**质感文件**，更美观且免费开源，但功能就要少不少了。

### App manager

一个应用管理器，功能更加强大，还能提取已安装应用的 apk。

### Androidacy 模块管理器

自从 magisk 不内置模块商店之后，找模块就是一个问题。使用这个应用可以解决部分问题。

## 一些操作

### Webview

各大厂商 webview 几乎都是严重落后的版本。许多应用是依赖 webview 的，所以有必要进行更新。

首先需要去得到新 webview 的包，可以去各种途径下载，下载后安装。然后在**爱玩机工具箱**中的**一个终端**中输入：

```sh
settings put global webview_provider com.google.android.webview
```

之后重启，在开发者模式中的 webview 提供程序中查看，如果出现了新的版本，就代表成功了，点击新版应用即可。如果没有出现新版 webview，可以按照这个试试：[CSDN](https://blog.csdn.net/weixin_44565784/article/details/126370271)