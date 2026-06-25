# POST /set-leverage

用于给某个合约交易对设置杠杆。

## 请求体字段

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `exchange` | 是 | 交易所标识 |
| `symbol` | 是 | 合约交易对 |
| `leverage` | 是 | 目标杠杆 |
| `margin_mode` | 可选 | 实际上 OKX 需要传；取值 `cross` 或 `isolated` |
| `api_key` / `secret_key` | 是 | 直连密钥 |
| `passphrase` | 条件必填 | OKX 和 Bitget 需要 |
| `testnet` | 可选 | 测试网或模拟盘开关 |

## 响应示例

```json
{
  "success": true,
  "data": {
    "exchange": "OKX",
    "symbol": "SOL-USDT-SWAP",
    "leverage": 10
  }
}
```

## 说明

- 超过本地安全上限的请求会在发往交易所之前被拒绝。
- 当前默认本地安全上限是 `100`，可通过 `TRADEARK_MAX_LOCAL_LEVERAGE` 调整。
- Gate 内部会用 `leverage=0` 表示全仓模式。