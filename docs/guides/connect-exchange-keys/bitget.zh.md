# Bitget

这一页演示怎么为 TradeArk 创建 Bitget API 密钥。

如果你还没有 Bitget 账户，可以先通过这里注册：

[Bitget 注册链接](https://partner.bitget.com/bg/signalhors)

Bitget API 创建地址：

`https://www.bitget.com/account/newapi`

## 创建密钥

1. 登录 Bitget 并开始 API 创建流程。

![Bitget API 创建表单](../../assets/exchange-api/bitget-create-form.png)

2. 填写 API 备注名称以及 Bitget 要求的 API 密码。

![Bitget API 密码](../../assets/exchange-api/bitget-api-password.png)

3. 只勾选必要的现货和合约交易权限，不要开启提现和钱包相关权限。

![Bitget 权限设置](../../assets/exchange-api/bitget-permissions.png)

4. 完成创建后，复制 Bitget 展示的 API Key 和 Secret Key。

![Bitget 已创建 API](../../assets/exchange-api/bitget-created-keys.png)

Bitget 后面接入 TradeArk 时还需要填写 passphrase 或 API 密码，所以请和密钥一起保存。

然后继续看 [接入 TradeArk](TradeArk.md)。