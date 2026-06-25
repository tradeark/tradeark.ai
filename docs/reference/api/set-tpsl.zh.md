# POST /set-tpsl

用于给现货或合约仓位创建止盈 / 止损保护。

## 请求体字段

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `exchange` | 是 | 交易所标识 |
| `symbol` | 是 | 需要保护的交易对 |
| `asset_type` | 是 | `spot` 或 `swap` |
| `side` | 是 | 平仓方向：保护多头用 `sell`，保护空头用 `buy` |
| `quantity` | 可选 | 受保护数量 |
| `quantity_unit` | 可选 | `base` 或 `exchange` |
| `take_profit_price` | 条件必填 | 如果没有 `stop_loss_price`，则必须提供 |
| `stop_loss_price` | 条件必填 | 如果没有 `take_profit_price`，则必须提供 |
| `position_side` | 可选 | 对冲模式下的 `long` 或 `short` |
| `account_id` | 推荐 | 已保存账户 UUID |
| `api_key` / `secret_key` | 条件必填 | 不使用 `account_id` 时直接传密钥 |
| `passphrase` | 条件必填 | OKX 和 Bitget 直连密钥时需要 |
| `testnet` | 可选 | 测试网或模拟盘开关 |

## 响应字段

| 字段 | 说明 |
| --- | --- |
| `exchange` | 交易所名称 |
| `symbol` | 受保护交易对 |
| `take_profit_order_id` | 创建成功时的止盈腿 ID |
| `stop_loss_order_id` | 创建成功时的止损腿 ID |

## 说明

- `take_profit_price` 和 `stop_loss_price` 至少要提供一个。
- 有些交易所是按仓位级设置 TP/SL，不一定真的产生两张独立订单。
- Bybit 合约 TP/SL 需要账户里已经有对应持仓。