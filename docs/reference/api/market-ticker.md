# GET /market/ticker

Returns one normalized ticker snapshot.

## Query parameters

| Parameter | Required | Meaning |
| --- | --- | --- |
| `exchange` | Yes | Exchange slug |
| `symbol` | Yes | Symbol to query |

## Response fields

| Field | Meaning |
| --- | --- |
| `symbol` | Normalized symbol |
| `last` | Last traded price |
| `change_24h` | 24h percentage change |
| `high_24h` | 24h high |
| `low_24h` | 24h low |
| `volume_24h` | 24h volume |