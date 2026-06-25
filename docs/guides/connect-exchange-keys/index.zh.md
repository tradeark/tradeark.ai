# 连接交易所密钥

这一组页面只讲一件事：怎么在交易所安全创建 API Key / Secret Key，并把这些密钥接入 TradeArk。

如果你想先认识账户表单里每个字段分别是干什么的，先看 [账户管理窗口](../account-center.md)。如果你只想先看 UI 里的添加流程，先看 [添加账户](../add-account.md)。

## 交易所注册链接

如果你还没有交易所账户，可以先通过下面这些 TradeArk 注册链接完成注册：

- [OKX 注册链接](https://www.okx.com/join/TradeArk)
- [Binance 注册链接](https://www.binance.com/join?ref=TradeArk)
- [Bitget 注册链接](https://partner.bitget.com/bg/signalhors)
- [Bybit 注册链接](https://www.bybit.com/invite?ref=4LORQ0)
- [Gate.io 注册链接](https://www.gateport.business/share/SIGNALHO)

## 为什么需要 API 密钥

TradeArk 通过交易所 API 密钥读取余额、读取持仓，并在你确认后代表你的账户发出交易请求。

!!! warning "不要开启提现权限"
    在交易所创建 API 密钥时，只保留交易和账户读取所需的最小权限，不要开启提现权限。

## 一个 API Key 通常可以覆盖多个市场

对大多数交易所来说，一套 API Key 就能同时读取现货和合约数据。例外情况是某些交易所会把不同环境或不同市场拆成不同授权范围，这时就需要为每个市场或每个环境单独创建一套密钥。

## 创建前先记住这些事

- 交易所弹出最终的 Key / Secret 窗口后，不要急着关闭，先完成复制。
- 第一次接入优先使用测试网或模拟盘凭据。
- 如果交易所要求 `passphrase` 或 API 密码，请和密钥一起立即保存。
- 交易所页面样式和按钮文案以后可能变化，但整体流程通常不会变。

## 分交易所教程

1. [OKX](okx.md)
2. [Binance](binance.md)
3. [Bitget](bitget.md)
4. [Gate.io](gate.md)
5. [Bybit](bybit.md)
6. [接入 TradeArk](TradeArk.md)

建议顺序：先在交易所侧创建密钥，再回到 TradeArk 完成连接测试和保存。