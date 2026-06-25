# GET /orders-history

返回已成交订单历史，并支持按资产类型、交易对、返回条数过滤。

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
| `limit` | 可选 | 最大返回条数，默认 `100` |

## 示例

```bash
curl -G http://127.0.0.1:38182/orders-history \
  --data-urlencode "exchange=okx" \
  --data-urlencode "account_id=ACCOUNT_UUID" \
  --data-urlencode "asset_type=swap" \
  --data-urlencode "symbol=BTCUSDT" \
  --data-urlencode "limit=50"
```

## 响应字段

| 字段 | 说明 |
| --- | --- |
| `order_id` | 交易所订单 ID |
| `symbol` | 交易所归一化后的交易对 |
| `side` | `buy` 或 `sell` |
| `position_side` | `long`、`short` 或 null |
| `quantity` | 成交数量 |
| `price` | 平均成交价 |
| `value` | 报价币计价的成交额 |
| `fee` / `fee_currency` | 手续费及手续费币种 |
| `leverage` | 合约成交的杠杆，现货为 null |
| `margin_mode` | `cross`、`isolated` 或 null |
| `asset_type` | `spot` 或 `swap` |
| `entry_price` | 交易所提供时的开仓价 |
| `realized_pnl` | 交易所提供时的已实现盈亏 |
| `order_type` | `market`、`limit` 或归一化后的交易所值 |
| `created_at` / `filled_at` | ISO 8601 UTC 时间戳 |

## 说明

- 这个接口的整体返回是 `ApiResponse<OrdersHistoryResponse>`。
- 它关注的是已成交记录；当前挂单请看 [GET /open-orders](open-orders.md)。