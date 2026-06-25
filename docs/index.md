# TradeArk User Manual

TradeArk is a local-first crypto trading workstation. This handbook focuses on the local UI provided by `rust_executor`, with an emphasis on understanding the interface, connecting accounts, placing manual and batch trades, using AI-assisted features, and checking results.

![TradeArk main UI overview](assets/ui/en/overview-btc-1h.png)

!!! note "About the screenshots"
    The screenshots in this handbook come from a test environment. They are here to explain the layout and entry points. Your own accounts, prices, positions, and AI configuration will differ.

!!! tip "Recommended reading order"
    1. Start with [First Run](getting-started/first-run.md) to make sure you can open the local UI.
    2. Continue with [UI Overview](guides/ui-tour.md) to learn what each region does.
    3. Read the feature pages in the “Interface Guide” section according to the areas you use most.
    4. Then go through [Add Accounts](guides/add-account.md) and [Manual Trading](guides/manual-trading.md) to complete one minimal trading workflow.
    5. After that, move on to [AI and Automation](guides/ai-automation.md).

## Core features at a glance

- Account management: add `OKX`, `Binance`, `Bybit`, `Bitget`, and `Gate.io` accounts from one window, separate live and testnet accounts, and batch-test connectivity.
- Batch trading: select multiple accounts in the right order panel, send the same open or close instruction to all of them, and use the bottom batch tools for one-pass cleanup.
- Manual trading: use market, limit, and trigger orders, set TP / SL, and verify positions, open orders, history, and assets from the bottom tabs.
- AI and automation: use the bottom-right AI analysis entry, the AI quick-order modal, and auto-trade tasks.

## What this system can do

- Open a unified trading UI in a local browser.
- Switch exchanges, market types, symbols, and timeframes from one page.
- Connect `OKX`, `Binance`, `Bybit`, `Bitget`, and `Gate.io` through the account center.
- Place manual and batch trades in the right order panel, set TP / SL, and inspect positions, orders, history, and assets from the bottom tabs.
- Use model analysis and automation through the top `AI` entry and the bottom auto-trade entry points.

## What batch trading means here

- In the right order panel, you can select multiple accounts at the same time and send the same open or close instruction to all of them.
- With the batch tools at the bottom of the panel, you can close positions or cancel open orders across the currently selected accounts in one pass.
- Before using it in live accounts, read [Right Order Panel](guides/order-panel.md) and [Manual Trading](guides/manual-trading.md), then validate the workflow with testnet accounts first.

## Quick facts

| Item | Current convention |
| --- | --- |
| Local UI URL | `http://127.0.0.1:38182/` |
| Health check | `GET /health` |
| Root path behavior | `GET /` currently serves both the UI and a health alias |
| Official download area | [Website install/download area](https://tradeark.ai/#install) |
| Main Windows artifact | [tradeark_windows_portable.zip](https://tradeark.ai/releases/latest/tradeark_windows_portable.zip) |
| Windows launcher | `Start TradeArk.cmd` |
| Linux / macOS one-line installer | [install.sh](https://tradeark.ai/install.sh) |
| Windows one-line installer | [install.ps1](https://tradeark.ai/install.ps1) |

## Who this handbook is for

- Users who want to run their trading tool on their own computer instead of sending keys to a remote control plane.
- Operators who want to trade manually and review status from a browser UI.
- Users who want to connect the local executor to OpenClaw, Claude Code, Codex, or other AI-assisted workflows.

## Documentation scope

This documentation is centered on opening the local UI, understanding the interface, configuring accounts, placing manual and batch trades, and using AI plus automation features.

It does not cover:

- Exchange adapter internals.
- Packaging script implementation details for Windows, macOS, or Linux.
- Website back-office, analytics dashboards, or internal admin logic.

If you are a normal user, you can skip the API section at first. Only go to [API Appendix (Advanced)](reference/api.md) when you need scripting, integration, or secondary development.

## Document map

If you are a normal user, this is the recommended reading path:

1. [First Run](getting-started/first-run.md)
2. [UI Overview](guides/ui-tour.md)
3. [Top Status Bar](guides/top-bar.md)
4. [Markets and Symbols Sidebar](guides/market-sidebar.md)
5. [Chart and Timeframe Tools](guides/chart-workspace.md)
6. [Bottom-Right AI Analysis](guides/ai-chart-analysis.md)
7. [AI Quick Order Modal](guides/ai-quick-order.md)
8. [One-Click Auto Trade](guides/auto-trade-launcher.md)
9. [Right Order Panel](guides/order-panel.md)
10. [Positions Tab](guides/positions-tab.md)
11. [Open Orders Tab](guides/open-orders-tab.md)
12. [Order History Tab](guides/order-history-tab.md)
13. [Position History Tab](guides/position-history-tab.md)
14. [Auto Trade Tab](guides/auto-trade-tab.md)
15. [Assets Tab](guides/assets-tab.md)
16. [Account Center](guides/account-center.md)
17. [AI Model Center](guides/ai-model-center.md)
18. [Add Accounts](guides/add-account.md)
19. [Manual Trading](guides/manual-trading.md)
20. [AI and Automation](guides/ai-automation.md)
21. [Updates and Maintenance](guides/update-maintenance.md)
22. [API Appendix (Advanced)](reference/api.md)

## What is already covered

- Every main UI region and each major bottom tab
- Account management, testnet distinction, and connectivity checks
- Manual trading, batch trading, TP / SL, batch cleanup, and result verification
- AI model management, bottom-right AI analysis, the AI quick-order modal, and the one-click auto-trade launcher
- Update procedures, maintenance checks, and the advanced API appendix