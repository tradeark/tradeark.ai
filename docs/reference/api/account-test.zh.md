# /accounts/test

用于测试一组原始交易所凭据，但不会保存到账户列表里。

## POST /accounts/test

### 请求体字段

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `exchange` | 是 | 交易所标识 |
| `api_key` | 是 | 交易所 API Key |
| `secret_key` | 是 | 交易所 Secret |
| `passphrase` | 条件必填 | OKX 和 Bitget 需要 |
| `testnet` | 可选 | 测试网或模拟盘开关 |

### 响应示例

```json
{ "ok": true }
```

或

```json
{ "ok": false, "message": "exchange returned an authentication error" }
```

## 说明

- 执行器会通过尝试读取余额来验证这组凭据。
- 交易所验证失败时，接口仍可能返回 HTTP 200，但 `ok=false`。