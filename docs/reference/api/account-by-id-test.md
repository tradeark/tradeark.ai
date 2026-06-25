# /accounts/:id/test

Tests one saved account by UUID.

## GET /accounts/:id/test

No body is required.

### Response

The response shape is the same as `/accounts/test`:

```json
{ "ok": true }
```

or

```json
{ "ok": false, "message": "account not found or exchange rejected the credentials" }
```

## Notes

- Missing accounts return a not-found response before any exchange call happens.
- Successful validation only proves that the stored credentials can read balances at the time of the test.