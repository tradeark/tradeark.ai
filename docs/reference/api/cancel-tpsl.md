# POST /cancel-tpsl

Cancels TP and/or SL protection created by `/set-tpsl`.

## Request body

| Field | Required | Meaning |
| --- | --- | --- |
| `exchange` | Yes | Exchange slug |
| `symbol` | Yes | Protected symbol |
| `asset_type` | Yes | `spot` or `swap` |
| `position_side` | Optional | Hedge-mode side when the exchange needs it |
| `take_profit_order_id` | Conditional | TP leg ID |
| `stop_loss_order_id` | Conditional | SL leg ID |
| `account_id` | Recommended | Saved account UUID |
| `api_key` / `secret_key` | Conditional | Direct credentials when `account_id` is not used |
| `passphrase` | Conditional | Required for OKX and Bitget with direct credentials |
| `testnet` | Optional | Demo or testnet flag |

## Notes

- For most exchanges, at least one order ID is required.
- Bybit swap is the exception: the handler allows position-level clearing without explicit order IDs.