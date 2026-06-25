# GET /health

Checks whether the local TradeArk executor is running. `/` and `/api/health` are aliases that currently return the same payload.

## Request

No query parameters, no request body, and no authentication.

## Example

```bash
curl -fsS http://127.0.0.1:38182/health
```

## Response

```json
{
  "status": "ok",
  "service": "TradeArk",
  "version": "<display-version>",
  "base_version": "<base-version>",
  "build_timestamp_utc": "2026-05-10T12:00:00Z",
  "embedded_ui": true,
  "timestamp": "2026-05-10T12:00:01Z"
}
```

## Response fields

| Field | Type | Meaning |
| --- | --- | --- |
| `status` | string | `ok` when the executor is up |
| `service` | string | Current service identifier; today it reports `TradeArk` |
| `version` | string | Human-facing display version |
| `base_version` | string | Base application version |
| `build_timestamp_utc` | string or null | Build timestamp embedded into the binary |
| `embedded_ui` | boolean | Whether the binary includes the local UI assets |
| `timestamp` | string | Current response timestamp in ISO 8601 UTC |

## Notes

- Use this endpoint first after install, restart, or service recovery.
- The root path `/` serves the local UI in normal use, but currently still returns the same health payload when requested directly.