# POST /set-margin-mode

Switches one swap symbol between cross and isolated margin.

## Request body

| Field | Required | Meaning |
| --- | --- | --- |
| `exchange` | Yes | Exchange slug |
| `symbol` | Yes | Swap symbol |
| `margin_mode` | Yes | `cross` or `isolated` |
| `leverage` | Optional | Used by exchanges that couple mode changes with leverage |
| `api_key` / `secret_key` | Yes | Direct credentials |
| `passphrase` | Conditional | Required for OKX and Bitget |
| `testnet` | Optional | Demo or testnet flag |

## Notes

- OKX applies margin mode and leverage together.
- Bybit and Gate can use the `leverage` field when switching into isolated mode.
- Bitget Unified Accounts can reject this operation at the exchange level.