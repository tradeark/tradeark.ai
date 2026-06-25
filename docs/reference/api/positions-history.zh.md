# GET /positions-history

返回已结束的 `swap` 仓位历史。它是按整笔仓位生命周期汇总的历史，不是逐笔成交历史。

## 查询参数

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `exchange` | 是 | 交易所标识 |
| `account_id` | 推荐 | 已保存账户 UUID |
| `api_key` / `secret_key` | 条件必填 | 不使用 `account_id` 时直接传密钥 |
| `passphrase` | 条件必填 | OKX 和 Bitget 直连密钥时需要 |
| `testnet` | 可选 | 测试网或模拟盘开关 |
| `symbol` | 可选 | 限定单一交易对 |
| `limit` | 可选 | 最大返回条数，默认 `100` |

## 响应字段

| 字段 | 说明 |
| --- | --- |
| `position_id` | 交易所记录 ID 或仓位 ID |
| `symbol` | 交易所归一化后的交易对 |
| `direction` | `long` 或 `short` |
| `quantity` | 已平数量 |
| `entry_price` | 交易所提供时的开仓均价 |
| `exit_price` | 平仓均价 |
| `realized_pnl` | 已实现盈亏 |
| `fee` / `fee_currency` | 手续费金额与币种 |
| `leverage` | 可用时返回的杠杆值 |
| `margin_mode` | `cross`、`isolated` 或 null |
| `opened_at` | 交易所提供时的开仓时间 |
| `closed_at` | 平仓时间 |

## 说明

- 这个接口只看 `swap` 历史。
- 不同交易所返回的历史字段不一致，所以 `entry_price` 和 `opened_at` 可能为 null。