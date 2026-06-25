# /accounts/:id/test

用于按 UUID 测试一个已保存账户。

## GET /accounts/:id/test

不需要请求体。

### 响应说明

返回结构和 `/accounts/test` 相同：

```json
{ "ok": true }
```

或

```json
{ "ok": false, "message": "account not found or exchange rejected the credentials" }
```

## 说明

- 如果账户不存在，会在发起任何交易所调用之前先返回未找到错误。
- 测试成功只表示这组已保存凭据在当前时刻可以完成余额读取。