# POST /set-tpsl

Creates take-profit and/or stop-loss protection for spot or swap positions.

## Request body

| Field | Required | Meaning |
| --- | --- | --- |
| `exchange` | Yes | Exchange slug |
| `symbol` | Yes | Symbol to protect |
| `asset_type` | Yes | `spot` or `swap` |
| `side` | Yes | Closing-side direction: `sell` for long protection, `buy` for short protection |
| `quantity` | Optional | Protected size |
| `quantity_unit` | Optional | `base` or `exchange` |
| `take_profit_price` | Conditional | Required unless `stop_loss_price` is present |
| `stop_loss_price` | Conditional | Required unless `take_profit_price` is present |
| `position_side` | Optional | Hedge-mode `long` or `short` |
| `account_id` | Recommended | Saved account UUID |
| `api_key` / `secret_key` | Conditional | Direct credentials when `account_id` is not used |
| `passphrase` | Conditional | Required for OKX and Bitget with direct credentials |
| `testnet` | Optional | Demo or testnet flag |

## Response fields

| Field | Meaning |
| --- | --- |
| `exchange` | Exchange name |
| `symbol` | Protected symbol |
| `take_profit_order_id` | TP leg ID when created |
| `stop_loss_order_id` | SL leg ID when created |

## Notes

- At least one of `take_profit_price` or `stop_loss_price` must be present.
- Some exchanges implement TP/SL at the position level rather than as two independent orders.
- Bybit swap TP/SL requires an already open position.