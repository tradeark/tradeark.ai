# /accounts/:id

This path updates or deletes one saved account by UUID.

## PUT /accounts/:id

Uses the same request body as account creation: `name`, `exchange`, `api_key`, `secret_key`, optional `passphrase`, and optional `testnet`.

Response shape:

```json
{
  "account": {
    "id": "ACCOUNT_UUID",
    "name": "Updated account",
    "exchange": "okx",
    "api_key_masked": "ABCD...WXYZ",
    "testnet": false
  }
}
```

## DELETE /accounts/:id

Deletes the saved account.

Response shape:

```json
{ "ok": true }
```

## Notes

- The current implementation returns JSON for delete success; it does not return HTTP 204.
- The `:id` segment must be a saved account UUID.