# GET /open-orders

返回当前未成交的普通挂单。你可以按资产类型和交易对做可选过滤。

## 查询参数

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `exchange` | 是 | 交易所标识 |
| `account_id` | 推荐 | 已保存账户 UUID |
| `api_key` / `secret_key` | 条件必填 | 不使用 `account_id` 时直接传密钥 |
| `passphrase` | 条件必填 | OKX 和 Bitget 直连密钥时需要 |
| `testnet` | 可选 | 测试网或模拟盘开关 |
| `asset_type` | 可选 | `spot` 或 `swap` |
| `symbol` | 可选 | 限定单一交易对 |

## 响应字段

| 字段 | 说明 |
| --- | --- |
| `order_id` | 交易所订单 ID |
| `symbol` | 交易所归一化后的交易对 |
| `order_type` | `market` 或 `limit` |
| `order_kind` | 可用时为 `regular` 或 `conditional` |
| `side` | `buy` 或 `sell` |
| `price` | 限价单价格，可为空 |
| `trigger_price` | 条件开单的触发价 |
| `quantity` | 原始下单数量 |
| `filled_quantity` | 已成交数量 |
| `status` | 当前挂单状态 |
| `asset_type` | `spot` 或 `swap` |
| `position_side` | `long`、`short` 或 null |
| `created_at` | ISO 8601 UTC 时间戳 |

## 说明

- 想撤销某一条挂单时，用 [POST /cancel-order](cancel-order.md) 并传对应的 `order_id`。
- 条件开单有时也会出现在这里，这类记录通常会带 `order_kind=conditional`。