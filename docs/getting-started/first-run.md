# First Run

The goal of this chapter is not to place an order immediately. It is to confirm that the local service, page, API, accounts, and testnet connectivity all work first.

## 1. Check service health

=== "PowerShell"

    ```powershell
    Invoke-WebRequest http://127.0.0.1:38182/health -UseBasicParsing
    ```

=== "Bash"

    ```bash
    curl -fsS http://127.0.0.1:38182/health
    ```

The expected result is JSON that includes `status: ok`.

## 2. Open the local UI

Open this URL in a browser:

```text
http://127.0.0.1:38182/
```

Under the current project behavior, the root path `/` is the main local trading UI entry point. `/health` is used for service availability checks.

## 3. Check which runtime mode you are using

The two common modes are:

- Windows portable package: started with `Start TradeArk.cmd`.
- Installer-based deployment: managed through local service commands.

## 4. Do a first read-only verification

Before you trade, verify three categories of read-only data first:

1. Whether balances can be read.
2. Whether positions can be read.
3. Whether order history or position history can be returned.

The reason is simple: if account permissions, testnet settings, exchange type, or symbol formatting are wrong, read APIs usually expose the problem earlier than order placement does.

## 5. Handle networking for remote access

If you want to access the UI from another device:

- On Linux, allow port `38182`.
- On cloud servers, check both the security group and the system firewall.
- On Windows desktop, local browser access is still the default and simpler choice.

Example remote access URL:

```text
http://<server-ip>:38182/
```

## 6. Common service commands

In installer-based setups, the common commands are usually:

```bash
tradeark service status
tradeark service restart
tradeark service uninstall
```

If the command is not in PATH, Linux and macOS users may need to call the executable directly from the install directory under their user environment.

## 7. Recommended first-run sequence

!!! tip "Safe order of operations"
    1. Confirm that `/health` works.
    2. Then open the UI.
    3. Add a testnet account first.
    4. Verify read-only APIs first.
    5. Then place one minimal test order.
    6. Only switch to live trading after that.

Next, continue with [Add Accounts](../guides/add-account.md).