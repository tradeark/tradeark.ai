# POST /ai/proxy

通过本地执行器代理一笔对外的 AI HTTP 请求。

## 请求体字段

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `url` | 是 | 完整上游 URL |
| `headers` | 是 | 字符串到字符串的请求头映射 |
| `body` | 是 | 任意 JSON 请求体 |

## 示例

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

## 响应行为

- 执行器会直接返回上游 HTTP 状态码。
- 执行器会原样返回上游响应体。
- 这个接口不会使用 `ApiResponse<T>` 做包裹。

## 说明

- 当上游返回 HTTP `529` 时，处理器最多会重试三次。
- 这是本地辅助接口，第三方密钥应该只保留在本机环境里。