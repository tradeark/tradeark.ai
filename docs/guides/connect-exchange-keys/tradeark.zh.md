# 接入 TradeArk

当交易所已经生成 API Key 和 Secret Key 后，这一页演示怎么把它们接入 TradeArk。

## 打开账户表单

1. 打开本地 UI。
2. 进入 `账户` 窗口并开始新建账户。

![TradeArk 账户表单](../../assets/exchange-api/TradeArk-account-form.png)

## 填写交易所密钥

1. 先选择交易所和当前环境。
2. 再把 `API Key` 和 `Secret Key` 依次粘贴到对应字段里。
3. 只有 `OKX` 和 `Bitget` 需要额外填写 `Passphrase` 或 API 密码。

![TradeArk 密钥输入字段](../../assets/exchange-api/TradeArk-key-input.png)

## 测试并保存

1. 先点击 `测试连接`。
2. 测试成功后，再保存账户配置。

![TradeArk 测试并保存](../../assets/exchange-api/TradeArk-test-save.png)

3. 保存后，账户应该会出现在账户列表里。

![TradeArk 账户列表](../../assets/exchange-api/TradeArk-account-list.png)

只要账户已经显示出来，且测试连接通过，就可以继续看 [添加账户](../add-account.md) 或 [手动交易](../manual-trading.md)。