# POST /close-all

用于按一个交易对或整个资产类型执行平仓 / 清仓。

## 请求体字段

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `exchange` | 是 | 交易所标识 |
| `asset_type` | 是 | `spot` 或 `swap` |
| `symbol` | 可选 | 省略时表示清理当前 `asset_type` 下全部可关闭对象 |
| `account_id` | 推荐 | 已保存账户 UUID |
| `api_key` / `secret_key` | 条件必填 | 不使用 `account_id` 时直接传密钥 |
| `passphrase` | 条件必填 | OKX 和 Bitget 直连密钥时需要 |
| `testnet` | 可选 | 测试网或模拟盘开关 |

## 响应说明

整体返回类型是 `ApiResponse<Vec<OrderResponse>>`，每一行代表执行器生成的一笔平仓订单。

## 说明

- 省略 `symbol` 时，执行器会尽量关闭当前资产类型下的全部仓位或持仓。
- 现货清仓后仍可能因为手续费或最小精度限制留下少量 dust。