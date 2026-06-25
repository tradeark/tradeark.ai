# /settings/ai

Persists local AI provider settings for the built-in UI and local automation features.

## GET /settings/ai

Returns the raw saved JSON, or `{}` when nothing has been stored yet.

## POST /settings/ai

Stores the raw JSON body and returns:

```json
{ "ok": true }
```

## Current UI payload shape

The local UI currently writes this object shape:

```json
{
  "defaultId": "profile-1",
  "profiles": [
    {
      "id": "profile-1",
      "name": "Primary model",
      "baseUrl": "https://api.example.com/v1",
      "apiKey": "sk-...",
      "model": "gpt-5.4",
      "systemInstruction": "You are a trading assistant."
    }
  ]
}
```

## Notes

- The executor stores this body as opaque JSON; it does not enforce a strict schema.
- Use [POST /ai/proxy](ai-proxy.md) for actual outbound AI requests.