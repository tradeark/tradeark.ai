# Connect Exchange API Keys

This guide set focuses on one thing only: how to create exchange API keys safely and how to connect those keys to TradeArk.

If you want the field-by-field explanation of the account form first, read [Account Center](../account-center.md). If you only need the in-app add flow, read [Add Accounts](../add-account.md).

## Exchange registration links

If you do not already have an exchange account, use these TradeArk registration links first:

- [OKX registration link](https://www.okx.com/join/TradeArk)
- [Binance registration link](https://www.binance.com/join?ref=TradeArk)
- [Bitget registration link](https://partner.bitget.com/bg/signalhors)
- [Bybit registration link](https://www.bybit.com/invite?ref=4LORQ0)
- [Gate.io registration link](https://www.gateport.business/share/SIGNALHO)

## Why you need API keys

TradeArk uses exchange API keys to read balances, read positions, and submit trades on the exchange account you choose.

!!! warning "Never enable withdrawal"
    When creating an exchange API key, grant only the minimum permissions needed for trading and account reads. Do not enable withdrawal permission.

## One API key can often cover multiple markets

For most exchanges, one API key can load both spot and swap data. The exception is that some exchanges separate environments or markets and require different keys for different scopes. In that case, create one dedicated key per market or per environment.

## Before you start

- Keep the final key-display window open until you finish copying the API key and secret into TradeArk.
- Prefer testnet or demo credentials for the first connection.
- If the exchange requires a passphrase or API password, save it together with the key immediately.
- Screens and button labels on exchange websites may change over time, but the flow stays broadly the same.

## Exchange-specific tutorials

1. [OKX](okx.md)
2. [Binance](binance.md)
3. [Bitget](bitget.md)
4. [Gate.io](gate.md)
5. [Bybit](bybit.md)
6. [Add the Keys to TradeArk](TradeArk.md)

Recommended order: create the key on the exchange first, then switch back to TradeArk and complete the connection test before saving the account.