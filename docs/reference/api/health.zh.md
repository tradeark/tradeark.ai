# GET /health

用于检查本地 TradeArk 执行器是否在线。当前 `/` 和 `/api/health` 都是它的别名，返回相同 payload。

## 请求方式

没有查询参数，没有请求体，也不需要认证。

## 示例

```bash
curl -fsS http://127.0.0.1:38182/health
```

## 响应示例

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

## 响应字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `status` | string | 执行器正常运行时固定为 `ok` |
| `service` | string | 当前服务标识，现阶段返回 `TradeArk` |
| `version` | string | 面向用户展示的版本号 |
| `base_version` | string | 基础应用版本号 |
| `build_timestamp_utc` | string 或 null | 编译时写入二进制的构建时间 |
| `embedded_ui` | boolean | 当前二进制是否内置本地 UI 资源 |
| `timestamp` | string | 本次响应生成时间，ISO 8601 UTC |

## 说明

- 安装后、重启后、服务恢复后，都应该先调用这个接口。
- `/` 在正常使用中是本地 UI 入口，但当前直接请求时仍会返回同一份健康检查 JSON。