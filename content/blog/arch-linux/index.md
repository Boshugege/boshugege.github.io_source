---
title: archlinux 简明安装指南
date: "2023-08-13"
---

装了很多回 archlinux ，跟了很多遍各种教程和官方 wiki ，也来自己写一个简单的笔记吧。

安装之前的准备略去不写，就从 archlinux 的 iso 启动之后开始吧。其实 archlinux 也只是安装过程**看上去**高级一点，滚动更新的理念和大部分所谓主流发行版有点区别，用惯了 TUI 操作的人对于无 GUI 操作应当还是比较适应的，更何况提供了好几个 Terminal 可以多线程操作，避免在等待的时候没事干（不是），甚至看到有老哥速通 archlinux 安装（这居然也有速通？）

至于跟 archlinux 这个话题有关的争议，反正不在这个笔记的叙述范围之内，快速进入正题吧。

进入 archlinux 安装环境之后，我们选择 `Arch Linux install medium (x86_64, UEFI)` 进入 archlinux 的安装环境，这是一个比较小的 live 系统，其 bash 已经可以给我们完成很多任务。

archlinux 镜像中现在启用了 `reflector` 服务，会自己更新镜像源，然而在存在 GFW 的特殊网络环境中，这个服务并不适合被启用，我们还是老老实实地禁用它吧。

```bash
systemctl stop reflector.service
```

查看服务状态，按`q`退出

```bash
systemctl status reflector.service
```

确认 `UEFI` 模式（保险起见）

```bash
ls /sys/firmware/efi/efivars
```
若有输出即是 `UEFI`

如果使用无线网络（有线跳过即可）：

```bash
iwctl # 进入交互式命令行
device list # 列出无线网卡设备名，比如无线网卡看到叫 wlan0
station wlan0 scan # 扫描网络
station wlan0 get-networks # 列出所有 wifi 网络
station wlan0 connect wifi-name # 进行连接，注意这里无法输入中文。回车后输入密码即可
exit # 连接成功后退出
```

随便 `ping` 一个网站，应该能看到网络的连接情况。按 `Ctrl+C` 退出。

同步时钟：

```bash
timedatectl set-ntp true
timedatectl status
```

更新国内镜像源：

```bash
vim /etc/pacman.d/mirrorlist
```

在最上面加入以下镜像源的任意一条

```bash
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch # 清华大学开源软件镜像站
Server = https://repo.huaweicloud.com/archlinux/$repo/os/$arch # 华为开源镜像站
Server = http://mirror.lzu.edu.cn/archlinux/$repo/os/$arch # 兰州大学开源镜像站
Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch # 中国科学技术大学开源镜像站
```

~~你问我为什么把科大放最下面？~~**我就爱用 thu 源**

现在我们进入磁盘分区阶段。

使用 `lsblk` 查看当前磁盘的情况，找到要用的磁盘和分区

```bash
lsblk
```

使用 `cfdisk` 对需要使用的磁盘分区：注意，SATA 磁盘名称为 sdx (x=a\~z)，NVME 磁盘名称为 nvmexn1 (x=0\~n)。

```bash
cfdisk /dev/sdx
```

使用上下方向键在需要操作的分区中移动，使用左右方向键在不同的操作中移动。我们 `[New]` 一个分区，指定大小，默认为 `Linux filesystem`，我们再选中并更改类型即可。

我们需要：一个内存大小 50% ~ 100% 的 `Swap` 分区，类型为 `Linux swap`，一个自定义大小的分区（2GiB 以上），类型为 `Linux filesystem`，因为我们使用 `Btrfs` 文件系统。

`[Write]` 并且 `[Quit]`，这时将对磁盘进行操作，这个操作**不可逆**！谨慎删除分区！

使用 `fdisk -l` 查看分区的情况 

先写到这里
