# OKX

Use this page to create an OKX API key for TradeArk.

If you do not already have an OKX account, register here first:

[OKX registration link](https://www.okx.com/join/TradeArk)

Open the OKX API page here:

`https://www.okx.com/account/my-api/batch-add`

## Create the key

1. Sign in to OKX and open the API creation page.
2. Fill in the required fields to create the API key.

![OKX API creation form](../../assets/exchange-api/okx-create-form.png)

3. For the IP field, only enter a whitelist if you really have a fixed IP environment such as a server. If you normally work behind changing residential IPs or VPNs, do not lock the key to an unstable address.
4. Grant trading permission only. Do not enable withdrawal permission. Complete the required 2FA or email verification to finish the creation.

![OKX created API key](../../assets/exchange-api/okx-created-keys.png)

!!! warning "Copy the credentials immediately"
    The API key and secret shown by the exchange are sensitive credentials. Do not share screenshots, do not paste them into unsafe chat tools, and do not leave them exposed on screen longer than necessary.

Once the key is created, continue to [Add the Keys to TradeArk](TradeArk.md).