# GET /balances

返回一个账户的现货余额和合约余额。对于统一账户交易所，这两个数组可能描述的是同一份保证金池。

## 查询参数

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `exchange` | 是 | `okx`、`binance`、`bitget`、`gate`、`bybit` |
| `account_id` | 推荐 | 已保存账户 UUID |
| `api_key` | 条件必填 | 不使用 `account_id` 时必填 |
| `secret_key` | 条件必填 | 不使用 `account_id` 时必填 |
| `passphrase` | 条件必填 | OKX 和 Bitget 直连密钥时需要 |
| `testnet` | 可选 | 测试网或模拟盘开关 |

## 示例

```bash
curl -G http://127.0.0.1:38182/balances \
  --data-urlencode "exchange=okx" \
  --data-urlencode "account_id=ACCOUNT_UUID"
```

## 响应示例

```json
{
  "success": true,
  "data": {
    "exchange": "OKX",
    "spot": [
      { "currency": "USDT", "available": "1200", "frozen": "0", "total": "1200" }
    ],
    "futures": [
      { "currency": "USDT", "available": "1200", "frozen": "0", "total": "1200" }
    ],
    "unified": true
  }
}
```

## 余额字段

| 字段 | 说明 |
| --- | --- |
| `currency` | 资产代码，例如 `USDT` |
| `available` | 可用余额 |
| `frozen` | 冻结或占用中的余额 |
| `total` | `available + frozen` |

## 说明

- `unified=true` 表示交易所使用统一账户，现货和合约共享一份保证金池。
- Binance 的现货和合约钱包分离，所以两个数组通常不同。