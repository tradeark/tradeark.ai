# GET /open-tpsl-orders

返回当前待触发的止盈止损订单。

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
| `order_id` | TP/SL 订单 ID |
| `symbol` | 交易所归一化后的交易对 |
| `tp_trigger_price` | 有值时表示止盈触发价 |
| `sl_trigger_price` | 有值时表示止损触发价 |
| `side` | 平仓方向 |
| `quantity` | 受保护数量；整仓保护时可能为 null |
| `asset_type` | `spot` 或 `swap` |
| `position_side` | `long`、`short` 或 null |
| `created_at` | ISO 8601 UTC 时间戳 |

## 说明

- 想取消其中一腿或两腿时，用 [POST /cancel-tpsl](cancel-tpsl.md)。
- Bybit 的合约 TP/SL 是仓位级，所以部分记录不会返回 `quantity`。