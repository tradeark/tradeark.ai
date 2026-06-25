# Updates and Maintenance

This chapter is for users who already have TradeArk running. It focuses on three practical questions:

1. How to confirm that the service is still alive
2. How to restart or recover it
3. How to update to a newer version

If you need to find the current public download entry again, open the [official website download area](https://tradeark.ai/#install).

## What to check first in daily maintenance

The health endpoint is always the first check:

```bash
curl -fsS http://127.0.0.1:38182/health
```

If this check fails, do not start with page buttons. Confirm the process, service, and port first.

## Common maintenance actions

### Check service status

```bash
tradeark service status
```

### Restart the service

```bash
tradeark service restart
```

### Uninstall the service

```bash
tradeark service uninstall
```

If you are not using service mode and are instead running the program directly in the foreground, maintenance usually means:

1. Stop the old process
2. Start the program again
3. Check `/health` once more

## Windows update method

The current primary Windows release artifact is [tradeark_windows_portable.zip](https://tradeark.ai/releases/latest/tradeark_windows_portable.zip).

The PowerShell install helper in the current project will:

1. Download the latest ZIP
2. Extract it into the target directory
3. Overwrite existing files with `-Force`

So the safest Windows update method is one of these:

### Method 1: Download the latest ZIP again and overwrite the old directory

Steps:

1. Stop the currently running `TradeArk.exe`
2. Download the new [tradeark_windows_portable.zip](https://tradeark.ai/releases/latest/tradeark_windows_portable.zip)
3. Extract it and overwrite the old directory
4. Run `Start TradeArk.cmd` again

### Method 2: Run the install helper script again

```powershell
Invoke-WebRequest -Uri https://tradeark.ai/install.ps1 -OutFile install.ps1
powershell -ExecutionPolicy Bypass -File .\install.ps1 -Yes
```

If you only want to stop the portable process, you can run:

```text
Stop TradeArk.cmd
```

## Linux / macOS update method

The install script re-downloads or replaces the target binary, so the most direct update flow is usually to run the installer script again. The same installer entry is also listed in the [official website download area](https://tradeark.ai/#install):

```bash
curl -fsSL https://tradeark.ai/install.sh | bash -s -- --non-interactive --skip-credentials --install-service
```

After that, confirm:

```bash
tradeark service status
curl -fsS http://127.0.0.1:38182/health
```

## What to check after every update

After every update, do at least these 5 checks:

1. Whether `/health` still works
2. Whether the UI opens
3. Whether the account list is still present
4. Whether balances and positions can still be read
5. Whether testnet can complete one minimal order and one cleanup action

## Common maintenance strategies

### Normal users

- Windows: overwrite with the latest ZIP
- Linux / macOS: re-run the install script
- After an update, prioritize read-only validation first