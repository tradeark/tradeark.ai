# 安装部署

本章说明如何把 TradeArk 安装到你的本机或服务器，并确认安装物、启动方式和访问地址都符合当前项目事实。

如果你想先到一个统一入口选择 Windows ZIP、macOS DMG 或安装脚本，直接打开 [官网下载安装区](https://tradeark.ai/#install)。

## 安装前准备

- 优先准备测试网或模拟盘凭据，不要第一次就直接使用实盘账户。
- 如果你是 Windows 用户，最简单的方式是使用当前的便携 ZIP。
- 如果你是 Linux / macOS 用户，最简单的方式是使用一键安装脚本。

## 平台安装方式

=== "Windows"

    当前推荐安装物是 [tradeark_windows_portable.zip](https://tradeark.ai/releases/latest/tradeark_windows_portable.zip)。

    操作步骤：

    1. 下载并解压 [tradeark_windows_portable.zip](https://tradeark.ai/releases/latest/tradeark_windows_portable.zip)。
    2. 打开解压后的目录。
    3. 运行 `Start TradeArk.cmd`。
    4. 程序会尝试在后台启动 `TradeArk.exe`，然后打开本地浏览器界面。

    默认访问地址：

    ```text
    http://127.0.0.1:38182/
    ```

    如果你更喜欢脚本安装到 `%LOCALAPPDATA%`，可使用：

    ```powershell
    Invoke-WebRequest -Uri https://tradeark.ai/install.ps1 -OutFile install.ps1
    powershell -ExecutionPolicy Bypass -File .\install.ps1 -Yes
    ```

    Windows 便携包当前保持在用户空间内运行，不要求管理员权限，也不会自动写入系统级自启动项。

=== "macOS"

    当前主发布物通常分为两类：

    ```text
    tradeark-macos-arm64.dmg
    tradeark-macos-amd64.dmg
    ```

    可从 [官网下载安装区](https://tradeark.ai/#install) 选择对应架构的 macOS 下载项。

    桌面用户建议：

    1. 下载对应架构的 `.dmg`。
    2. 将应用拖入 `/Applications`。
    3. 首次打开后，通过菜单栏图标打开浏览器 UI。
    4. 需要时使用菜单执行重启服务、安装服务等动作。

    如果你要做命令行部署或无人值守安装：

    ```bash
    curl -fsSL https://tradeark.ai/install.sh | bash -s -- --non-interactive --skip-credentials --install-service
    ```

=== "Linux"

    Linux 当前推荐使用一键安装脚本：

    如果你想先从官网入口进入，也可以直接打开 [官网下载安装区](https://tradeark.ai/#install)。

    ```bash
    curl -fsSL https://tradeark.ai/install.sh | bash -s -- --non-interactive --skip-credentials --install-service
    ```

    安装脚本会尝试：

    1. 下载正确架构的可执行文件。
    2. 安装到系统目录或用户目录。
    3. 配置本地服务。
    4. 让服务在当前用户环境中自动启动。

    安装完成后，本地访问地址仍然是：

    ```text
    http://127.0.0.1:38182/
    ```

## 安装后的第一件事

安装完不要马上下单。先做以下检查：

1. 访问 `http://127.0.0.1:38182/` 看页面是否能打开。
2. 调用 `GET /health` 确认服务在线。
3. 只用测试网账户验证一次余额和持仓读取。
4. 再进入 [首次启动](first-run.md) 和 [添加账户](../guides/add-account.md) 继续配置。