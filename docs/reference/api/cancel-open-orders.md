# POST /cancel-open-orders

Cancels many open orders in one request. It can target one symbol or the entire account, and it can optionally include TP/SL orders.

## Request body

| Field | Required | Meaning |
| --- | --- | --- |
| `exchange` | Yes | Exchange slug |
| `symbol` | Optional | Limit cancellation to one symbol |
| `asset_type` | Optional | `spot` or `swap`; omit to include both |
| `include_tpsl` | Optional | Defaults to `true` |
| `max_parallel` | Optional | Concurrency hint for fallback cancellation logic |
| `account_id` | Recommended | Saved account UUID |
| `api_key` / `secret_key` | Conditional | Direct credentials when `account_id` is not used |
| `passphrase` | Conditional | Required for OKX and Bitget with direct credentials |
| `testnet` | Optional | Demo or testnet flag |

## Response fields

| Field | Meaning |
| --- | --- |
| `exchange` | Exchange name |
| `total` | Total rows considered |
| `cancelled` | Number cancelled successfully |
| `failed` | Number that failed |
| `errors` | Aggregate error strings |
| `results[]` | Per-order result rows |

Each `results[]` item includes `order_id`, `symbol`, `kind`, `success`, and optional `message`.

## Notes

- This is the fastest cleanup route when you need to flatten an account's pending orders before restarting automation.
- `kind` is `order` or `tpsl` in the per-row result set.