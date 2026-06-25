# /settings/ai

用于给内置 UI 和本地自动化功能保存 AI 提供方配置。

## GET /settings/ai

返回原样保存的 JSON；如果尚未保存过，返回 `{}`。

## POST /settings/ai

把请求体 JSON 原样保存，并返回：

```json
{ "ok": true }
```

## 当前 UI 使用的 payload 结构

本地 UI 当前写入的是下面这个对象：

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

## 说明

- 执行器会把这个请求体当作不透明 JSON 保存，不会强制校验严格 schema。
- 真正发起外部 AI 请求时，请看 [POST /ai/proxy](ai-proxy.md)。