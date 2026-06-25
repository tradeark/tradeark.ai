# GET /positions-history

Returns closed swap position history. This is position-level settlement history rather than per-fill order history.

## Query parameters

| Parameter | Required | Meaning |
| --- | --- | --- |
| `exchange` | Yes | Exchange slug |
| `account_id` | Recommended | Saved account UUID |
| `api_key` / `secret_key` | Conditional | Direct credentials when `account_id` is not used |
| `passphrase` | Conditional | Required for OKX and Bitget with direct credentials |
| `testnet` | Optional | Demo or testnet flag |
| `symbol` | Optional | Filter one symbol |
| `limit` | Optional | Maximum rows; default `100` |

## Response fields

| Field | Meaning |
| --- | --- |
| `position_id` | Exchange record or position ID |
| `symbol` | Exchange-normalized symbol |
| `direction` | `long` or `short` |
| `quantity` | Closed size |
| `entry_price` | Entry price when the exchange exposes it |
| `exit_price` | Exit price |
| `realized_pnl` | Realized profit or loss |
| `fee` / `fee_currency` | Fee amount and fee asset |
| `leverage` | Position leverage when available |
| `margin_mode` | `cross`, `isolated`, or null |
| `opened_at` | Open time when the exchange provides it |
| `closed_at` | Close time |

## Notes

- This endpoint is for `swap` history only.
- Exchanges differ in how much historical metadata they expose, so `entry_price` and `opened_at` can be null.