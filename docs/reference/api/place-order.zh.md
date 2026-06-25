# POST /place-order

用于下现货或合约订单。`/order` 是历史兼容别名，最终走同一个处理器。

## 请求体字段

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `exchange` | 是 | 交易所标识 |
| `symbol` | 是 | 交易对，例如 `BTCUSDT` 或 `BTC/USDT` |
| `asset_type` | 是 | `spot` 或 `swap` |
| `side` | 是 | `buy` 或 `sell` |
| `quantity` | 是 | 下单数量 |
| `quantity_unit` | 可选 | `base` 或 `exchange` |
| `order_type` | 可选 | 默认为 `market`；限价挂单请用 `limit` |
| `price` | 条件必填 | `order_type=limit` 时必填 |
| `leverage` | 可选 | 合约杠杆，默认 `1` |
| `margin_mode` | 可选 | `cross` 或 `isolated` |
| `position_side` | 可选 | 对冲模式合约可传 `long` 或 `short` |
| `action` | 可选 | `open` 或 `close` |
| `trigger_price` | 可选 | 条件开单触发价 |
| `trigger_direction` | 可选 | `above` 或 `below` |
| `auto_reverse` | 可选 | `1` 表示开仓前先尝试平掉反向仓位 |
| `account_id` | 推荐 | 已保存账户 UUID |
| `api_key` / `secret_key` | 条件必填 | 不使用 `account_id` 时直接传密钥 |
| `passphrase` | 条件必填 | OKX 和 Bitget 直连密钥时需要 |
| `testnet` | 可选 | 测试网或模拟盘开关 |

## 示例

```bash
curl -X POST http://127.0.0.1:38182/place-order \
  -H "Content-Type: application/json" \
  -d '{
    "exchange": "bybit",
    "symbol": "BTCUSDT",
    "asset_type": "swap",
    "side": "buy",
    "action": "open",
    "quantity": 0.001,
    "quantity_unit": "base",
    "leverage": 3,
    "order_type": "market",
    "account_id": "ACCOUNT_UUID",
    "testnet": true
  }'
```

## 响应示例

```json
{
  "success": true,
  "data": {
    "success": true,
    "order_id": "1234567890",
    "exchange": "Bybit",
    "symbol": "BTCUSDT",
    "side": "buy",
    "quantity": "0.001",
    "message": null
  }
}
```

## 说明

- 传入 `account_id` 后，缺失的密钥字段会自动从已保存账户中补齐。
- 在支持的合约交易所上，`trigger_price + trigger_direction` 会触发条件开单而不是立即成交。
- 失败时返回 `success=false`，并在 `error` 字段给出可读错误信息。