# /accounts/test

Tests raw exchange credentials without saving them.

## POST /accounts/test

### Request body

| Field | Required | Meaning |
| --- | --- | --- |
| `exchange` | Yes | Exchange slug |
| `api_key` | Yes | Exchange API key |
| `secret_key` | Yes | Exchange API secret |
| `passphrase` | Conditional | Required for OKX and Bitget |
| `testnet` | Optional | Demo or testnet flag |

### Response

```json
{ "ok": true }
```

or

```json
{ "ok": false, "message": "exchange returned an authentication error" }
```

## Notes

- The executor validates credentials by attempting a balance read.
- A failed exchange test can still return HTTP 200 with `ok=false`.