# GET /orders-history

Returns filled order history and supports filtering by asset type, symbol, and result count.

## Query parameters

| Parameter | Required | Meaning |
| --- | --- | --- |
| `exchange` | Yes | Exchange slug |
| `account_id` | Recommended | Saved account UUID |
| `api_key` / `secret_key` | Conditional | Direct credentials when `account_id` is not used |
| `passphrase` | Conditional | Required for OKX and Bitget with direct credentials |
| `testnet` | Optional | Demo or testnet flag |
| `asset_type` | Optional | `spot` or `swap` |
| `symbol` | Optional | Filter to one symbol |
| `limit` | Optional | Maximum rows; default `100` |

## Example

```bash
curl -G http://127.0.0.1:38182/orders-history \
  --data-urlencode "exchange=okx" \
  --data-urlencode "account_id=ACCOUNT_UUID" \
  --data-urlencode "asset_type=swap" \
  --data-urlencode "symbol=BTCUSDT" \
  --data-urlencode "limit=50"
```

## Response fields

| Field | Meaning |
| --- | --- |
| `order_id` | Exchange order ID |
| `symbol` | Exchange-normalized symbol |
| `side` | `buy` or `sell` |
| `position_side` | `long`, `short`, or null |
| `quantity` | Filled quantity |
| `price` | Average fill price |
| `value` | Filled value in quote currency |
| `fee` / `fee_currency` | Trading fee and fee asset |
| `leverage` | Leverage for swap fills, otherwise null |
| `margin_mode` | `cross`, `isolated`, or null |
| `asset_type` | `spot` or `swap` |
| `entry_price` | Entry price when the exchange provides it |
| `realized_pnl` | Realized PnL when the exchange provides it |
| `order_type` | `market`, `limit`, or exchange-specific normalized value |
| `created_at` / `filled_at` | ISO 8601 UTC timestamps |

## Notes

- The response is wrapped as `ApiResponse<OrdersHistoryResponse>`.
- This endpoint is fill-oriented. For current pending orders, use [GET /open-orders](open-orders.md).