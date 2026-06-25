# GET /market/symbols

返回来自公开交易所接口的可交易 symbol 列表。

## 查询参数

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `exchange` | 是 | 交易所标识 |
| `asset_type` | 可选 | `spot` 或 `swap` |

## 响应字段

| 字段 | 说明 |
| --- | --- |
| `symbol` | 归一化后的交易对 |
| `base` / `quote` | 基础币和报价币 |
| `asset_type` | `spot` 或 `swap` |
| `exchange` | 交易所标识 |
| `contract_size` | 每张合约对应的基础币数量；现货固定为 `1` |
| `volume_usd_24h` | 近 24 小时近似美元成交量 |

## 说明

- 为了减轻交易所压力，执行器会把 symbol 列表缓存五分钟。
- 这是公开接口，不需要任何凭据。