---
title: 使用笔记：内网穿透+远程桌面，流畅使用远程计算机
date: "2022-05-18"
---

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-P8BK01ELC3"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-P8BK01ELC3');
</script>

大概叙述一下我做这个的原因：疫情网课后为方便不在学校附近，而电脑因有 HDD 导致不方便搬运（其实还是因为太重），故用远程桌面访问。Windows 已提前升级成专业版，开启了远程桌面。

Windows 自带的远程桌面可以有各种各样的配置，使用多种多样的屏幕分辨率和本地资源等。当然，由于中国的各位基本上都是内网用户，所以我们不能直接连接，需要一些配置
才能访问。

于是，我使用了一个类 VPN 的服务 ZeroTier ，只简单配置了一下，并没有开服务器 moon ，不过国内的 UDP 流量很容易遭到丢包处理，所以不太稳定，正在
找寻解决方案。（一种解决方案是使用免费服务器作为备用的 TCP 握手服务器，不过我没有这个条件）

想要具体方法可以留下评论（转型期 等我把 gitalk 搞过来再说）……懒得写了，只是写个笔记而已