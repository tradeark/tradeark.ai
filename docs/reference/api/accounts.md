# /accounts

This path handles account listing and account creation. Saved accounts let later requests use `account_id` instead of raw exchange credentials.

## Storage model

Accounts are stored locally in an AES-256-GCM encrypted file. The API returns masked key previews only.

## GET /accounts

Lists all saved accounts.

### Response fields

| Field | Meaning |
| --- | --- |
| `id` | Account UUID |
| `name` | Human-readable account label |
| `exchange` | Exchange slug |
| `api_key_masked` | Masked key preview |
| `testnet` | Whether the saved account targets demo or testnet |

## POST /accounts

Creates a saved account.

### Request body

| Field | Required | Meaning |
| --- | --- | --- |
| `name` | Yes | Local display name |
| `exchange` | Yes | Exchange slug |
| `api_key` | Yes | Exchange API key |
| `secret_key` | Yes | Exchange API secret |
| `passphrase` | Conditional | Required for OKX and Bitget |
| `testnet` | Optional | Save this account as demo or testnet |

### Response

Returns `{ "account": { ...public account fields... } }`.

## Notes

- Use the returned `id` as `account_id` in private read and trading requests.
- This endpoint is local-only and does not require exchange authentication itself.