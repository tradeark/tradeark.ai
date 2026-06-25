# POST /cancel-order

用于取消一笔未成交的普通订单，不处理 TP/SL 订单。

## 请求体字段

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `exchange` | 是 | 交易所标识 |
| `symbol` | 是 | 原订单所属交易对 |
| `asset_type` | 是 | `spot` 或 `swap` |
| `order_id` | 是 | `/place-order` 返回的订单 ID，或 `/open-orders` 中列出的订单 ID |
| `order_kind` | 可选 | `regular` 或 `conditional` |
| `account_id` | 推荐 | 已保存账户 UUID |
| `api_key` / `secret_key` | 条件必填 | 不使用 `account_id` 时直接传密钥 |
| `passphrase` | 条件必填 | OKX 和 Bitget 直连密钥时需要 |
| `testnet` | 可选 | 测试网或模拟盘开关 |

## 响应示例

```json
{
  "success": true,
  "data": {
    "exchange": "OKX",
    "symbol": "SOL-USDT-SWAP",
    "order_id": "3500631285938315264"
  }
}
```

## 说明

- 取消条件开单时，建议带上 `order_kind=conditional`，这类订单通常来自 [GET /open-orders](open-orders.md)。
- TP/SL 订单要走单独接口：[POST /cancel-tpsl](cancel-tpsl.md)。