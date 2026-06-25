# 更新与维护

这一章面向已经把 TradeArk 用起来的人。重点是三件事：

1. 怎么确认服务还活着
2. 怎么重启或恢复运行
3. 怎么更新到新版本

如果你需要重新找到当前公开下载入口，直接打开 [官网下载安装区](https://tradeark.ai/#install)。

## 日常维护先看什么

最先检查的永远是健康接口：

```bash
curl -fsS http://127.0.0.1:38182/health
```

如果这里失败，不要先研究页面按钮。先确认进程、服务和端口。

## 常用维护动作

### 检查服务状态

```bash
tradeark service status
```

### 重启服务

```bash
tradeark service restart
```

### 卸载服务

```bash
tradeark service uninstall
```

如果你不是服务模式，而是直接前台运行程序，那么维护动作通常是：

1. 停掉当前旧进程
2. 重新启动程序
3. 再检查 `/health`

## Windows 更新方式

当前 Windows 主发布物是 [tradeark_windows_portable.zip](https://tradeark.ai/releases/latest/tradeark_windows_portable.zip)。

当前项目里的 PowerShell 安装辅助脚本会：

1. 下载最新 ZIP
2. 解压到目标目录
3. 用 `-Force` 覆盖已有文件

所以 Windows 最稳妥的更新方式是二选一：

### 方式 1：重新下载最新 ZIP 并覆盖旧目录

步骤：

1. 停掉当前运行的 `TradeArk.exe`
2. 下载新的 [tradeark_windows_portable.zip](https://tradeark.ai/releases/latest/tradeark_windows_portable.zip)
3. 解压并覆盖旧目录
4. 再运行 `Start TradeArk.cmd`

### 方式 2：重新运行安装辅助脚本

```powershell
Invoke-WebRequest -Uri https://tradeark.ai/install.ps1 -OutFile install.ps1
powershell -ExecutionPolicy Bypass -File .\install.ps1 -Yes
```

如果只是想停止便携版进程，可以直接运行：

```text
Stop TradeArk.cmd
```

## Linux / macOS 更新方式

安装脚本会重新下载或替换目标二进制，所以最直接的更新方式通常是重新执行安装脚本。这个安装入口也会出现在 [官网下载安装区](https://tradeark.ai/#install)：

```bash
curl -fsSL https://tradeark.ai/install.sh | bash -s -- --non-interactive --skip-credentials --install-service
```

执行完后，再确认：

```bash
tradeark service status
curl -fsS http://127.0.0.1:38182/health
```

## 更新后应该检查什么

每次更新后，至少做这 5 件事：

1. `/health` 是否正常
2. UI 能否打开
3. 账户列表是否还在
4. 余额和持仓读取是否正常
5. 测试网能否完成一次最小下单和清理

## 常见维护策略

### 普通用户

- Windows：覆盖解压最新 ZIP
- Linux / macOS：重跑安装脚本
- 更新后优先做只读验证
