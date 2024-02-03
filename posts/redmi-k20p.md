---
title: 老机荣光 | 红米 K20 Pro
date: "2024-02-03"
tags: 
  - K20P
  - Root
  - KernelSU
  - MIUI
  - HyperOS
  - Android
categories:
  - 随笔
---

是什么？是一只 Redmi K20 Pro！

<!--more-->

## 缘起

在二零二三年九月，我于闲鱼购得我的第一部个人手机————小米 11 Pro。然而，没多久，它的屏幕坏了，于是我就购买了新的 k20p。

> 问：为什么不换屏？
> 答： 换屏费用甚至比我买这破手机都贵。。。。。。

~~其实还有一个原因，我的 11p 被我妈收了（~~

## 开刷

买小米嘛，bl 肯定是要解的（安静等七天，但是我在第五天就解了，我也不太明白哩）

k20p 的资源真的是要比我往日的夏普 s2，小米 11pro 要丰富得多。对比如图：

|    |  小米 11 Pro | 红米 K20 Pro|
|-----|-----|----| 
| Romer | 基本无持续更新者 | 七宫智音，sylu，corn，越南佬 |
 内核 | 56，vk（只有 vk 有 ksu） | Marisa，VK，Rikka，Soviet（除了魔理沙都有 KernelSU） |

如此一比，我只得感叹选对机的重要性……

我目前是越南佬 MIUI 14，A12，1403 版 + Rikka V2 内核，省电、性能、颜值兼具 ~~香的一批~~

我未来钉这机钉多久，就取决于我这机子 UFS 寿命几何了~~（如果有好心人 v 我 1500 让我去买红米 note12 turbo那我就直接润）~~

不过这机 UFS 寿命只剩一半了……能钉多久尚不可知（

### 包的选择

K20P 的包只能说非常多。这里点评一下各路 ROM。

|ROMer| 点评 |
|----|----|
|七宫智音|国内用户最推荐，目前（2024-02-03）主要做 HyperOS，MIUI14 与 OriginOS4，（注：七宫包不全公开，会在内群发布一些包，且内群不定期收人）|
|Sylu|这位跟七宫关系比较密切，但做了很多包，比如 MagicOS，鸿蒙，OneUI， MIUI 都有做|
|corn|与七宫关系也很密切，但似乎只做 OriginOS4（？|
|越南佬|越南大佬，做 HyperOS 与 MIUI14 的包|

越南的包是非常精简的，特别是 HyperOS，裸包的米系应用只有手机管家，主题，设置，相机，拨号，短信这几个（但他有专门的 data-app 包，twrp 刷了完事（我还是喜欢自己装apk）

七宫的包之前一直被盗包，导致他现在很多包都只在内部群发……

至于类原，那玩意我曾经也很喜欢，最困扰我的就是推送，你不挂推送就得把 QQ 挂后台，挂了 MiPush 还天天掉。。。。。于是，这就是我润 MIUI/HyperOS 的最后一根稻草了（

然后移植的其他的什么 OriginOS，ColorOS，MagicOS......Bug 奇多，不建议使用（据老哥说 ColorOS bug 在这几个里比较少，但耗电非常快）

## 模块优化

Uperf，LSPosed，ZygiskNext（Ksu 开 zygisk 必备）都是少不了的嘞（调度还是有用的，不开调度功耗都在 2w+，开均衡就能到 1.8w 左右）

另外建议刷 27w 充电模块，个人推荐白话的模块，最近刚刷了龙虾的 27w，还没测功率（

本人建议装个墓碑，比如 SMillet 或 NoActive，压后台比较好用（用墓碑务必把**代理软件**加进**白名单**）