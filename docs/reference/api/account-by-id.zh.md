# /accounts/:id

这个路径通过 UUID 更新或删除单个已保存账户。

## PUT /accounts/:id

请求体和创建账户相同：`name`、`exchange`、`api_key`、`secret_key`，以及可选的 `passphrase`、`testnet`。

响应格式：

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

删除这个已保存账户。

响应格式：

```json
{ "ok": true }
```

## 说明

- 当前实现删除成功后返回 JSON，而不是 HTTP 204。
- `:id` 必须是已经保存过的账户 UUID。