---
title: 20款拯救者刃9000/刃9000k锁频锁功耗问题的原因和解决
date: "2022-07-30"
---

折腾了这么久，终于把这个东西折腾完了……快乐

这两款整机，不管什么配置，从后期出厂开始就一直是 12A 版本的 BIOS，这个版本的 BIOS 会导致 CPU 的功耗被锁在 65W，具体表现就是当 CPU 全核满负载运行的时候，任务管理器内的占用率会始终显示 63% 左右，并且频率锁定在 2.3GHz。i9 变 E5 名不虚传。然而，升级了 BIOS，问题依然存在，而且找不到任何相应的设置项。

解决方法其实非常简单，但是网络上几乎没有任何资料，只有在谷歌上搜索得出的结果里，联想论坛的一个帖子有一些线索。[链接]<https://club.lenovo.com.cn/forum.php?mod=viewthread&tid=6297932'>。根据最后一楼的提示，把BIOS设置重置，就可以直接解决问题了。

联想出厂 BIOS 就能有 Bug 也是无语……升级 BIOS 不彻底修复 Bug 更让人无语……好吧，现在能好好用了。

解决问题后全核 4.6GHz，CPU-Z 跑分 557.7/6826.2 多处理器的倍率还是低了一点，不过差不远了，毕竟品牌机的电源不大给力。

品牌机 BIOS 真的一生之敌，虽然说不要随便升 BIOS 但是有的时候疑难杂症真的最后只能这么解决。