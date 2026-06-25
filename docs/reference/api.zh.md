# API 接口参考

这里是 TradeArk 本地 HTTP 和 WebSocket 接口的详细参考页。左侧导航已经按接口名拆开，方便你直接跳到目标端点。

## 基本地址

默认本地执行器监听地址：

```text
http://127.0.0.1:38182
```

WebSocket 行情流使用同一主机：

```text
ws://127.0.0.1:38182/ws/klines
```

## 认证模型

私有读接口和交易写接口支持两种凭据风格：

1. 推荐：传 `account_id`，复用本地 UI 中已经保存的账户。
2. 兜底：直接传 `api_key`、`secret_key`、`passphrase`。

当前契约有一个容易忽略的点：

- 即使传了 `account_id`，请求里仍然需要带 `exchange`，因为路由解析阶段需要它。
- 完成账户查找后，已保存账户里的 `exchange` 和 `testnet` 会覆盖请求中的对应值。
- `passphrase` 只在 OKX 和 Bitget 上需要。

## 常用请求字段

| 字段 | 含义 |
| --- | --- |
| `exchange` | `okx`、`binance`、`bitget`、`gate`、`bybit` |
| `asset_type` | `spot` 或 `swap` |
| `symbol` | `BTCUSDT`、`BTC/USDT` 这类交易对写法 |
| `account_id` | 由 `/accounts` 返回的 UUID |
| `api_key` / `secret_key` | 直接传交易所密钥 |
| `passphrase` | OKX 和 Bitget 的口令 |
| `testnet` | `true` 走测试网或模拟盘，省略或 `false` 走实盘 |
| `quantity_unit` | `base` 或 `exchange`，用于区分数量语义 |

## 响应约定

不同接口族的响应包裹略有区别：

- 大多数私有读接口和交易写接口返回 `ApiResponse<T>`。
- `/health` 返回原始 JSON，不带 `success` 或 `data` 包裹。
- `/accounts`、`/settings/*`、`/market/*` 返回各自独立的 JSON 结构。
- `/ai/proxy` 会直接透传上游状态码和响应体。

常见成功包裹：

```json
{
  "success": true,
  "data": { "...": "..." }
}
```

常见失败包裹：

```json
{
  "success": false,
  "error": "可读错误信息"
}
```

## 接口地图

### 服务与健康

- [GET /health](api/health.md)

### 私有读接口

- [GET /positions](api/positions.md)
- [GET /balances](api/balances.md)
- [GET /orders-history](api/orders-history.md)
- [GET /positions-history](api/positions-history.md)
- [GET /open-orders](api/open-orders.md)
- [GET /open-tpsl-orders](api/open-tpsl-orders.md)

### 交易写接口

- [POST /place-order](api/place-order.md)
- [POST /cancel-order](api/cancel-order.md)
- [POST /cancel-open-orders](api/cancel-open-orders.md)
- [POST /close-all](api/close-all.md)
- [POST /set-leverage](api/set-leverage.md)
- [POST /set-margin-mode](api/set-margin-mode.md)
- [POST /set-tpsl](api/set-tpsl.md)
- [POST /cancel-tpsl](api/cancel-tpsl.md)

### 账户与本地设置

- [/accounts](api/accounts.md)
- [/accounts/:id](api/account-by-id.md)
- [/accounts/test](api/account-test.md)
- [/accounts/:id/test](api/account-by-id-test.md)
- [/settings/ai](api/settings-ai.md)
- [/settings/bots](api/settings-bots.md)

### 市场数据与 AI

- [GET /market/symbols](api/market-symbols.md)
- [GET /market/ticker](api/market-ticker.md)
- [GET /market/tickers](api/market-tickers.md)
- [GET /market/klines](api/market-klines.md)
- [WS /ws/klines](api/ws-klines.md)
- [POST /ai/proxy](api/ai-proxy.md)

## 推荐接入顺序

!!! tip "推荐的本地接入方式"
    1. 先用 [GET /health](api/health.md) 确认本地服务已启动。
    2. 优先通过 [/accounts](api/accounts.md) 保存账户，再在后续请求里使用 `account_id`。
    3. 先用 [GET /balances](api/balances.md)、[GET /positions](api/positions.md)、[GET /orders-history](api/orders-history.md) 做只读确认。
    4. 确认无误后，再使用 [POST /place-order](api/place-order.md)、[POST /set-tpsl](api/set-tpsl.md) 这类写接口。