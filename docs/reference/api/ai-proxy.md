# POST /ai/proxy

Proxies one outbound AI HTTP request through the local executor.

## Request body

| Field | Required | Meaning |
| --- | --- | --- |
| `url` | Yes | Full upstream URL |
| `headers` | Yes | String-to-string header map |
| `body` | Yes | Arbitrary JSON request body |

## Example

```json
{
  "url": "https://api.example.com/v1/chat/completions",
  "headers": {
    "Authorization": "Bearer sk-..."
  },
  "body": {
    "model": "gpt-5.4",
    "messages": [
      { "role": "user", "content": "Summarize BTC market structure." }
    ]
  }
}
```

## Response behavior

- The executor returns the upstream HTTP status code.
- The executor returns the upstream response body as-is.
- This route does not wrap responses in `ApiResponse<T>`.

## Notes

- The handler retries up to three times when the upstream returns HTTP `529`.
- This is a local helper route; keep third-party secrets on the local machine only.