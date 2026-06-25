# Manual Trading

The local TradeArk UI is well suited for two things:

1. Viewing charts, accounts, positions, orders, and historical records from a single interface.
2. Completing manual order placement, TP / SL setup, and batch cleanup actions on the same page.

If you are not yet familiar with the page layout, read [UI Overview](ui-tour.md) first.

## The areas most worth understanding first

- Chart and market area: used for the current symbol, timeframe, and price context. See [Chart and Timeframe Tools](chart-workspace.md).
- Account and asset area: used for connected accounts, balances, and status. See [Assets Tab](assets-tab.md) and [Account Center](account-center.md).
- Positions and orders area: used for current positions, open orders, TP / SL, and history. See [Positions Tab](positions-tab.md), [Open Orders Tab](open-orders-tab.md), [Order History Tab](order-history-tab.md), and [Position History Tab](position-history-tab.md).
- Order entry area: used for manual orders, leverage, margin mode, and trigger orders. See [Right Order Panel](order-panel.md).

## Basic functions of the right order area

The right-side order area is the main battlefield for manual trading. The most common functions are:

- Select one or more accounts.
- Choose `Open` / `Close`.
- Choose `Long` / `Short`.
- Choose `Market` / `Limit` / `Trigger`.
- Enter quantity.
- Adjust leverage and margin mode.
- Enable `TP / SL`.
- After execution, confirm the result through the bottom tabs.

## Minimal checks before manual order placement

!!! tip "Check first, then click"
    1. Is the current account a testnet account?
    2. Is the current market `spot` or `swap`?
    3. Is the symbol really the one you want, such as `BTCUSDT`?
    4. Is the quantity entered in coin units, rather than what you mistakenly assume is contracts or USDT notional?
    5. Are leverage, side, and open/close action correct?

## Order types

| Type | Typical use | Notes |
| --- | --- | --- |
| Market order | Immediate execution | The easiest way to verify that the end-to-end path works |
| Limit order | Rest an order at a target price | Requires a `price` |
| Trigger order | Submit after the trigger price is reached | Mainly intended for swap workflows and needs `trigger_price` plus `trigger_direction` |

The current UI has more complete support for trigger orders on perpetual swap markets. In spot workflows, prefer market or limit orders and trust the real exchange state over assumptions.

## Typical swap trading flow

1. Select the exchange and `swap`.
2. Select the symbol and timeframe.
3. Choose `buy` or `sell`.
4. Choose `open` or `close`.
5. Enter quantity. In the current UI, the default input meaning is base-asset quantity.
6. Set leverage and margin mode if needed.
7. Choose market, limit, or trigger order.
8. Configure TP / SL after the order is open if necessary.

## Where to verify after execution

After placing an order, do not just check whether the button click appeared to succeed. Immediately verify it from the bottom tabs:

- `Positions`: confirm whether a real position appeared.
- `Open Orders`: confirm whether a limit or trigger order is actually pending.
- `Order History`: confirm whether the order was sent and filled.
- `Position History`: confirm how the position was ultimately closed.
- `Assets`: confirm whether balances changed.

## Typical spot trading flow

1. Select the exchange and `spot`.
2. Select the symbol.
3. Enter the buy or sell quantity.
4. Use a market or limit order to complete the trade.
5. Use batch close or individual cancellation actions when needed.

## TP / SL usage suggestions

TradeArk supports setting take profit and stop loss for positions. The core advice is:

- Confirm that the position really exists first.
- Then set TP / SL according to long or short direction.
- Whenever the exchange reports limits, insufficient position size, or different testnet capabilities, trust the API result over assumptions.

Inside the UI, the easiest workflow is to open the position first, then use the `TP/SL` button in the positions table to add protection.

## Cancellations and one-click cleanup

The most common cleanup actions in manual trading are usually:

- Cancel normal open orders.
- Cancel TP / SL.
- One-click close the current swap position or one-click sell the current spot holdings.

The `Batch Tools` section at the bottom of the right panel can help you clean up risk quickly across multiple accounts, but always verify the currently selected accounts again before executing.

Before any batch action, confirm the current account and market type one more time to avoid operating on the wrong account.

## Recommended first manual trading exercise

Use testnet to complete a minimal sequence first:

1. Read balances.
2. Open one minimal market order.
3. Confirm that the position appears.
4. Set one TP / SL pair.
5. Then execute one close or cleanup action.

After completing this sequence, continue to [AI and Automation](ai-automation.md).

If you later want to automate these actions, go to [API Appendix (Advanced)](../reference/api.md).