# GET /market/symbols

Returns the tradable symbol list from public exchange APIs.

## Query parameters

| Parameter | Required | Meaning |
| --- | --- | --- |
| `exchange` | Yes | Exchange slug |
| `asset_type` | Optional | `spot` or `swap` |

## Response fields

| Field | Meaning |
| --- | --- |
| `symbol` | Normalized symbol |
| `base` / `quote` | Base and quote assets |
| `asset_type` | `spot` or `swap` |
| `exchange` | Exchange slug |
| `contract_size` | Base-asset amount per contract; `1` for spot |
| `volume_usd_24h` | Approximate 24h USD volume |

## Notes

- The executor caches symbol lists for five minutes to reduce exchange load.
- This endpoint is public and does not need credentials.