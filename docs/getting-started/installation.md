# Installation

This chapter explains how to install TradeArk on your local machine or server, and how to confirm that the package, startup method, and access URL match the current product behavior.

If you want one place to choose the current Windows ZIP, macOS DMG, or installer script first, open the [official website download area](https://tradeark.ai/#install).

## Before you install

- Prepare testnet or paper-trading credentials first. Do not start with a live account on day one.
- If you are on Windows, the easiest option is the current portable ZIP package.
- If you are on Linux or macOS, the easiest option is the one-line installer script.

## Platform installation methods

=== "Windows"

    The currently recommended package is [tradeark_windows_portable.zip](https://tradeark.ai/releases/latest/tradeark_windows_portable.zip).

    Steps:

    1. Download and extract [tradeark_windows_portable.zip](https://tradeark.ai/releases/latest/tradeark_windows_portable.zip).
    2. Open the extracted folder.
    3. Run `Start TradeArk.cmd`.
    4. The program will try to start `TradeArk.exe` in the background and then open the local browser UI.

    Default access URL:

    ```text
    http://127.0.0.1:38182/
    ```

    If you prefer a script-based install into `%LOCALAPPDATA%`, use:

    ```powershell
    Invoke-WebRequest -Uri https://tradeark.ai/install.ps1 -OutFile install.ps1
    powershell -ExecutionPolicy Bypass -File .\install.ps1 -Yes
    ```

    The Windows portable package currently runs in user space, does not require administrator privileges, and does not automatically create a system-level auto-start entry.

=== "macOS"

    The current primary release artifacts are usually:

    ```text
    tradeark-macos-arm64.dmg
    tradeark-macos-amd64.dmg
    ```

    Choose the matching macOS download from the [official website download area](https://tradeark.ai/#install).

    For desktop users, the recommended flow is:

    1. Download the `.dmg` that matches your CPU architecture.
    2. Drag the app into `/Applications`.
    3. Open the browser UI from the menu bar icon after first launch.
    4. Use menu actions such as service restart or service installation when needed.

    If you need a command-line or unattended installation:

    ```bash
    curl -fsSL https://tradeark.ai/install.sh | bash -s -- --non-interactive --skip-credentials --install-service
    ```

=== "Linux"

    The current recommended Linux method is the one-line installer:

    You can also start from the [official website download area](https://tradeark.ai/#install) and use the same installer entry there.

    ```bash
    curl -fsSL https://tradeark.ai/install.sh | bash -s -- --non-interactive --skip-credentials --install-service
    ```

    The installer will try to:

    1. Download the correct executable for the current architecture.
    2. Install it into a system or user directory.
    3. Configure the local service.
    4. Make the service start automatically in the current user environment.

    After installation, the local access URL is still:

    ```text
    http://127.0.0.1:38182/
    ```

## The first thing to do after installation

Do not place an order immediately after installing. Start with these checks:

1. Open `http://127.0.0.1:38182/` and make sure the page loads.
2. Call `GET /health` to confirm that the service is online.
3. Use only testnet accounts to verify one balance read and one positions read.
4. Then continue with [First Run](first-run.md) and [Add Accounts](../guides/add-account.md).