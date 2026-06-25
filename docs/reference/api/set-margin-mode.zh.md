# POST /set-margin-mode

用于在某个合约交易对上切换全仓或逐仓。

## 请求体字段

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `exchange` | 是 | 交易所标识 |
| `symbol` | 是 | 合约交易对 |
| `margin_mode` | 是 | `cross` 或 `isolated` |
| `leverage` | 可选 | 某些交易所在切换模式时也需要这个杠杆值 |
| `api_key` / `secret_key` | 是 | 直连密钥 |
| `passphrase` | 条件必填 | OKX 和 Bitget 需要 |
| `testnet` | 可选 | 测试网或模拟盘开关 |

## 说明

- OKX 会把保证金模式和杠杆一起应用。
- Bybit 和 Gate 在切换到逐仓时可能会读取 `leverage`。
- Bitget 的统一账户环境可能会在交易所侧直接拒绝这个操作。