# POST /cancel-open-orders

用于一次性取消多笔未成交订单。既可以只针对一个交易对，也可以清理整个账户，还可以选择是否把 TP/SL 一并取消。

## 请求体字段

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `exchange` | 是 | 交易所标识 |
| `symbol` | 可选 | 只取消指定交易对 |
| `asset_type` | 可选 | `spot` 或 `swap`；省略则两者都包含 |
| `include_tpsl` | 可选 | 默认 `true` |
| `max_parallel` | 可选 | fallback 批量取消时的并发提示 |
| `account_id` | 推荐 | 已保存账户 UUID |
| `api_key` / `secret_key` | 条件必填 | 不使用 `account_id` 时直接传密钥 |
| `passphrase` | 条件必填 | OKX 和 Bitget 直连密钥时需要 |
| `testnet` | 可选 | 测试网或模拟盘开关 |

## 响应字段

| 字段 | 说明 |
| --- | --- |
| `exchange` | 交易所名称 |
| `total` | 总共处理的订单数 |
| `cancelled` | 成功取消数量 |
| `failed` | 失败数量 |
| `errors` | 汇总错误信息列表 |
| `results[]` | 每一条订单的结果 |

每个 `results[]` 项包含 `order_id`、`symbol`、`kind`、`success` 和可选的 `message`。

## 说明

- 当你需要在重启自动化前快速清空账户挂单时，这个接口最方便。
- 每条结果中的 `kind` 只会是 `order` 或 `tpsl`。