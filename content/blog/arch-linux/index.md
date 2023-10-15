---
title: archlinux 简明安装指南【未完成】
date: "2023-08-13"
---

装了很多回`archlinux`，跟了很多遍各种教程和官方 wiki ，也来自己写一个简单的笔记吧。

安装之前的准备略去不写，就从`archlinux`的 iso 启动之后开始吧。其实`archlinux`也只是安装过程**看上去**高级一点，滚动更新的理念和大部分所谓主流发行版有点区别，用惯了 TUI 操作的人对于无 GUI 操作应当还是比较适应的，更何况提供了好几个 terminal 可以多线程操作，避免在等待的时候没事干（不是），甚至看到有老哥速通`archlinux`安装（这居然也有速通？）

至于跟`archlinux`这个话题有关的争议，反正不在这个笔记的叙述范围之内，快速进入正题吧。

进入`archlinux`安装环境之后，我们选择 `Arch Linux install medium (x86_64, UEFI)` 进入`archlinux`的安装环境，这是一个比较小的 live 系统，其 bash 已经可以给我们完成很多任务。

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

~~你问我为什么把科大放最下面？~~**我就爱用 THU 源**

现在我们进入磁盘分区阶段。

使用 `lsblk` 查看当前磁盘的情况，找到要用的磁盘和分区

```bash
lsblk
```

使用 `cfdisk` 对需要使用的磁盘分区：注意，SATA 磁盘名称为 sdx (x=a\~z)，NVME 磁盘名称为 nvmexn1 (x=0\~n)。（接下来我们都以 SATA 磁盘举例，请 NVME 用户注意）

```bash
cfdisk /dev/sdx
```

使用上下方向键在需要操作的分区中移动，使用左右方向键在不同的操作中移动。我们 `[New]` 一个分区，指定大小，默认为 `Linux filesystem`，我们再选中并更改类型即可。

我们需要：一个内存大小 50% ~ 100% 的 `Swap` 分区，类型为 `Linux swap`，一个自定义大小的分区（2GiB 以上），类型为 `Linux filesystem`，因为我们使用 `Btrfs` 文件系统。

`[Write]` 并且 `[Quit]`，这时将对磁盘进行操作，这个操作**不可逆**！谨慎删除分区！

使用 `fdisk -l` 查看分区的情况 

格式化并创建子卷

EFI：（双系统请跳过这步，不需要格式化）：

```bash
mkfs.fat -F32 /dev/sdxn
```

Swap：
```bash
mkswap /dev/sdxn
```

Btrfs 分区：（archlinux为卷标，可自定义，但不可以包含特殊字符和空格）
```bash
mkfs.btrfs -L archlinux /dev/sdxn
```

挂载：
```bash
mount -t btrfs -o compress=zstd /dev/sdxn /mnt
```

使用`df -h`复查挂载情况，若不对，用`umount`卸载重来。

创建子卷：
```bash
btrfs subvolume create /mnt/@
btrfs subvolume create /mnt/@home
```

复查：
```bash
btrfs subvolume list -p /mnt
```

卸载：
```bash
umount /mnt
```

准确按照如下顺序挂载子卷！

```bash
mount -t btrfs -o subvol=/@,compress=zstd /dev/sdxn /mnt
mkdir /mnt/home
mount -t btrfs -o subvol=/@home,compress=zstd /dev/sdxn /mnt/home
mkdir -p /mnt/boot
mount /dev/sdxn /mnt/boot
swapon /dev/sdxn
```

复查：`df -h`，`free -h`

使用`pacstrap`安装基本包：_终于进入安装了 :)_
```bash
pacstrap /mnt base base-devel linux linux-firmware btrfs-progs
```

若提示 GPG 证书错误，使用`pacman -S archlilnux-keyrinig`更新解决。

安装亿些必要软件（把`zsh`换成`bash`也是可以哒~老东西用惯了）：

```bash
pacstrap /mnt networkmanager vim sudo zsh zsh-completions
```

生成 fstab file：

```bash
genfstab -U /mnt > /mnt/etc/fstab
cat /mnt/etc/fstab
```

有正常输出即可。

chroot（就快成功了！）

```bash
arch-chroot /mnt
```

设置主机名，同样，不要有特殊字符和空格：
```bash
vim /etc/hostname
```

设置 hosts：
```bash
vim /etc/hosts
```

输入：
```
127.0.0.1   localhost
::1         localhost
127.0.1.1   主机名
```

设置时区：
```bash
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

同步时间：
```bash
hwclock --systohc
```

地区化：
```bash
vim /etc/locale.gen
```
编辑`/etc/locale.gen`，去掉`en_US.UTF-8 UTF-8`以及`zh_CN.UTF-8 UTF-8`行前的注释符号（#）：

生成：
```bash
locale-gen
```

输入（不要中文！会乱码）：
```bash
echo 'LANG=en_US.UTF-8'  > /etc/locale.conf
```

设置密码：
```bash
passwd root
```

安装微码（根据 CPU）：
```bash
pacman -S intel-ucode # Intel
pacman -S amd-ucode # AMD
```

用`GRUB`引导：
```bash
pacman -S grub efibootmgr os-prober
```

安装`GRUB`：
```bash
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=ARCH
```

```bash
vim /etc/default/grub
```

去掉 GRUB_CMDLINE_LINUX_DEFAULT 一行中最后的 quiet 参数，把 loglevel 的数值从 3 改成 5。这样是为了后续如果出现系统错误，方便排错，加入 nowatchdog 参数，这可以显著提高开关机速度。

为引导，`Windows`添加一行：
```
GRUB_DISABLE_OS_PROBER=false
```

生成配置文件：
```bash
grub-mkconfig -o /boot/grub/grub.cfg
```

若引导了`Windows`，会"Found Windows Boot Manager"，若双硬盘双系统，则先不着急，进入`archlinux`后重新执行该命令。

拔掉U盘，

```bash
exit
umount -R /mnt
reboot
```

进入系统啦！

善后：
```bash
systemctl enable --now NetworkManager #联网
#无线：
nmcli dev wifi list # 显示附近的 Wi-Fi 网络
nmcli dev wifi connect "Wi-Fi名（SSID）" password "网络密码" # 连接指定的无线网络
neofetch #你会爱上它的
```
大功告成。
