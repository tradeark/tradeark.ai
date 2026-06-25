# FAQ

## 1. The page will not open. What should I check first?

Check whether the local service is online first:

```bash
curl -fsS http://127.0.0.1:38182/health
```

If the health check fails, do not start by blaming the frontend page. Confirm that the process has really started.

## 2. Why can I open the page, but balance reads fail?

Usually you should check these categories first:

- The account environment is wrong, for example a live key was configured with `testnet=true`.
- Spot and swap testnet credentials are not the same set.
- The API key does not have enough permissions.
- A required `passphrase` was not filled in.

## 3. Why is the Windows release a ZIP instead of an installer?

The current primary Windows artifact is the portable ZIP: `tradeark_windows_portable.zip`. Its advantages are simplicity, no admin dependency, and direct extract-and-run behavior, which fits a local browser-style UI well.

If you want update instructions, go directly to [Updates and Maintenance](../guides/update-maintenance.md).

## 4. Where does Windows open after startup?

By default it opens:

```text
http://127.0.0.1:38182/
```

## 5. Why does testnet work, but live trading fail?

Because many exchanges separate testnet and live environments completely: hosts, permissions, keys, and account systems are all different. As soon as the environment changes, do not assume credentials can be reused.

## 6. How can other people access the page on a Linux server?

Two conditions must both be true:

1. TradeArk is already listening and running normally.
2. The server firewall or security group allows port `38182`.

Then access it with:

```text
http://<server-ip>:38182/
```

## 7. Can GitHub Pages run the whole project website directly?

No. GitHub Pages can only host a static documentation site. It cannot run the backend of this project and it cannot replace the local executor.

## 8. After separating the docs site and the main site, where should download links live?

The recommended split is:

- GitHub Pages hosts the documentation.
- Install scripts, ZIPs, DMGs, and Linux binaries remain on the main site download area at [tradeark.ai/#install](https://tradeark.ai/#install) or on GitHub Releases.
- The docs only reference those official download URLs.

## 9. Why did my TP / SL not work as expected?

Check these first:

- Whether the position really exists already.
- Whether you are currently in testnet.
- Whether the current exchange environment supports that TP / SL mode.
- Whether the trigger side and price are reasonable.

In testnet workflows, exchange-side limitations are usually more trustworthy than the UI button state.

## 10. Should I learn manual trading first or automation first?

Manual first, then automation. At minimum, complete this flow once end to end: read balances -> open a position -> check positions -> set TP / SL -> close the position. Only after that should you let AI execute automatically.