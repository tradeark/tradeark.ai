# POST /close-all

Closes positions or liquidates spot holdings for one symbol or for the entire selected asset type.

## Request body

| Field | Required | Meaning |
| --- | --- | --- |
| `exchange` | Yes | Exchange slug |
| `asset_type` | Yes | `spot` or `swap` |
| `symbol` | Optional | Omit to close everything under the selected `asset_type` |
| `account_id` | Recommended | Saved account UUID |
| `api_key` / `secret_key` | Conditional | Direct credentials when `account_id` is not used |
| `passphrase` | Conditional | Required for OKX and Bitget with direct credentials |
| `testnet` | Optional | Demo or testnet flag |

## Response

The response is `ApiResponse<Vec<OrderResponse>>`, one row per generated close order.

## Notes

- When `symbol` is omitted, the executor attempts to close every eligible position or holding for that asset type.
- Spot cleanup can still leave tiny dust balances because of fees or minimum step sizes on the exchange.