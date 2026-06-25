# POST /cancel-tpsl

用于取消由 `/set-tpsl` 创建的止盈 / 止损保护。

## 请求体字段

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `exchange` | 是 | 交易所标识 |
| `symbol` | 是 | 受保护交易对 |
| `asset_type` | 是 | `spot` 或 `swap` |
| `position_side` | 可选 | 某些交易所在对冲模式下需要这个方向 |
| `take_profit_order_id` | 条件必填 | 止盈腿 ID |
| `stop_loss_order_id` | 条件必填 | 止损腿 ID |
| `account_id` | 推荐 | 已保存账户 UUID |
| `api_key` / `secret_key` | 条件必填 | 不使用 `account_id` 时直接传密钥 |
| `passphrase` | 条件必填 | OKX 和 Bitget 直连密钥时需要 |
| `testnet` | 可选 | 测试网或模拟盘开关 |

## 说明

- 大多数交易所至少需要提供一个订单 ID。
- Bybit 合约是例外：处理器允许不带显式订单 ID，直接按仓位级清除 TP/SL。