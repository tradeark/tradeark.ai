# API Reference

This section is the detailed reference for the local HTTP and WebSocket interfaces exposed by TradeArk. The pages in the left navigation are organized by endpoint name so you can jump straight to the interface you need.

## Base address

By default, the local executor listens on:

```text
http://127.0.0.1:38182
```

WebSocket market streaming uses the same host:

```text
ws://127.0.0.1:38182/ws/klines
```

## Authentication model

Private read endpoints and trading write endpoints support two credential styles:

1. Preferred: send `account_id` for an account that is already saved in the local UI.
2. Fallback: send `api_key`, `secret_key`, and `passphrase` directly in the query string or JSON body.

Important contract detail:

- `exchange` is still syntactically required by the request shape even when `account_id` is present.
- After account lookup, the saved account's `exchange` and `testnet` values become authoritative.
- `passphrase` is required only for OKX and Bitget.

## Common request fields

| Field | Meaning |
| --- | --- |
| `exchange` | `okx`, `binance`, `bitget`, `gate`, or `bybit` |
| `asset_type` | `spot` or `swap` |
| `symbol` | `BTCUSDT`, `BTC/USDT`, and similar exchange symbols |
| `account_id` | UUID returned by `/accounts` after saving an account |
| `api_key` / `secret_key` | Direct exchange credentials |
| `passphrase` | Exchange passphrase for OKX and Bitget |
| `testnet` | `true` for demo or testnet when supported; omitted or `false` for live |
| `quantity_unit` | `base` or `exchange`; used when order size semantics differ by exchange |

## Response conventions

Different endpoint families use slightly different response envelopes:

- Most private read endpoints and trading write endpoints return `ApiResponse<T>`.
- `/health` returns raw JSON without `success` or `data` wrapping.
- `/accounts`, `/settings/*`, and `/market/*` return route-specific JSON shapes.
- `/ai/proxy` passes through the upstream status code and body directly.

Typical wrapped success:

```json
{
  "success": true,
  "data": { "...": "..." }
}
```

Typical wrapped failure:

```json
{
  "success": false,
  "error": "human-readable error message"
}
```

## Endpoint map

### Service and health

- [GET /health](api/health.md)

### Private read APIs

- [GET /positions](api/positions.md)
- [GET /balances](api/balances.md)
- [GET /orders-history](api/orders-history.md)
- [GET /positions-history](api/positions-history.md)
- [GET /open-orders](api/open-orders.md)
- [GET /open-tpsl-orders](api/open-tpsl-orders.md)

### Trading write APIs

- [POST /place-order](api/place-order.md)
- [POST /cancel-order](api/cancel-order.md)
- [POST /cancel-open-orders](api/cancel-open-orders.md)
- [POST /close-all](api/close-all.md)
- [POST /set-leverage](api/set-leverage.md)
- [POST /set-margin-mode](api/set-margin-mode.md)
- [POST /set-tpsl](api/set-tpsl.md)
- [POST /cancel-tpsl](api/cancel-tpsl.md)

### Accounts and local settings

- [/accounts](api/accounts.md)
- [/accounts/:id](api/account-by-id.md)
- [/accounts/test](api/account-test.md)
- [/accounts/:id/test](api/account-by-id-test.md)
- [/settings/ai](api/settings-ai.md)
- [/settings/bots](api/settings-bots.md)

### Market data and AI

- [GET /market/symbols](api/market-symbols.md)
- [GET /market/ticker](api/market-ticker.md)
- [GET /market/tickers](api/market-tickers.md)
- [GET /market/klines](api/market-klines.md)
- [WS /ws/klines](api/ws-klines.md)
- [POST /ai/proxy](api/ai-proxy.md)

## Recommended integration order

!!! tip "Recommended local integration flow"
    1. Start with [GET /health](api/health.md) to confirm the local service is running.
    2. Use saved accounts from [/accounts](api/accounts.md) when you can.
    3. Validate read access with [GET /balances](api/balances.md), [GET /positions](api/positions.md), and [GET /orders-history](api/orders-history.md).
    4. Only then move on to write endpoints such as [POST /place-order](api/place-order.md) and [POST /set-tpsl](api/set-tpsl.md).