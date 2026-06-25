# GET /positions

返回指定交易账户当前持有的 `swap` 持仓。这个接口只看合约仓位，不返回余额。

## 查询参数

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `exchange` | 是 | `okx`、`binance`、`bitget`、`gate`、`bybit` |
| `account_id` | 推荐 | 已保存账户的 UUID，优先于原始密钥 |
| `api_key` | 条件必填 | 不使用 `account_id` 时必填 |
| `secret_key` | 条件必填 | 不使用 `account_id` 时必填 |
| `passphrase` | 条件必填 | OKX 和 Bitget 直连密钥时需要 |
| `testnet` | 可选 | `true` 走测试网或模拟盘，否则走实盘 |

## 示例

```bash
curl -G http://127.0.0.1:38182/positions \
  --data-urlencode "exchange=bybit" \
  --data-urlencode "account_id=ACCOUNT_UUID" \
  --data-urlencode "testnet=true"
```

## 响应示例

```json
{
  "success": true,
  "data": {
    "exchange": "Bybit",
    "positions": [
      {
        "symbol": "BTCUSDT",
        "side": "long",
        "size": "0.01",
        "entry_price": "64000",
        "mark_price": "64210",
        "liquidation_price": "61234",
        "unrealized_pnl": "2.10",
        "leverage": 5,
        "margin_mode": "cross"
      }
    ]
  }
}
```

## 持仓字段

| 字段 | 说明 |
| --- | --- |
| `symbol` | 交易所归一化后的合约符号 |
| `side` | `long` 或 `short` |
| `size` | 仓位数量 |
| `entry_price` | 平均开仓价 |
| `mark_price` | 交易所提供时的当前标记价 |
| `liquidation_price` | 可用时返回的强平价 |
| `unrealized_pnl` | 当前未实现盈亏 |
| `leverage` | 当前杠杆 |
| `margin_mode` | `cross` 或 `isolated` |

## 说明

- 即使使用 `account_id`，请求里仍然需要 `exchange`；账户查找到之后会自动应用账户保存的交易所信息。
- 这里不返回现货资产。钱包余额请看 [GET /balances](balances.md)。