// TradeArk - Main JavaScript

// Global state
let selectedMode = null;
let selectedExchange = null;
let selectedOS = null;

async function writeClipboardText(text) {
    const normalized = String(text ?? '').replace(/\s+$/, '');
    if (!normalized) {
        return false;
    }

    if (navigator.clipboard?.writeText) {
        try {
            await navigator.clipboard.writeText(normalized);
            return true;
        } catch (_) {}
    }

    const textarea = document.createElement('textarea');
    textarea.value = normalized;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    let success = false;
    try {
        success = document.execCommand('copy');
    } catch (_) {
        success = false;
    }

    document.body.removeChild(textarea);
    return success;
}

function flashCopyButton(button, copied) {
    if (!button) {
        return;
    }

    const icon = button.querySelector('i');
    const originalIconClass = button.dataset.originalIconClass || icon?.className || 'bi bi-clipboard';
    button.dataset.originalIconClass = originalIconClass;
    button.classList.remove('is-copy-failed');

    if (copied) {
        button.classList.add('is-copied');
        if (icon) {
            icon.className = 'bi bi-check2';
        }
    } else {
        button.classList.add('is-copy-failed');
        if (icon) {
            icon.className = 'bi bi-exclamation-lg';
        }
    }

    window.setTimeout(() => {
        button.classList.remove('is-copied', 'is-copy-failed');
        if (icon) {
            icon.className = originalIconClass;
        }
    }, copied ? 1400 : 1800);
}

async function copyFromNode(node, button) {
    const source = node && typeof node.value === 'string' ? node.value : node?.textContent;
    const copied = await writeClipboardText(source || '');
    flashCopyButton(button, copied);
    return copied;
}

async function copyCodeBlock(button) {
    const targetSelector = String(button?.dataset?.copyTarget || '').trim();
    const sourceNode = targetSelector
        ? document.querySelector(targetSelector)
        : button?.closest('.command-copy-block, .code-block')?.querySelector('pre, textarea, code');
    return copyFromNode(sourceNode, button);
}

async function copyInstallCommand() {
    const sourceNode = document.getElementById('install-code');
    const button = document.querySelector('#install-command .copy-btn');
    return copyFromNode(sourceNode, button);
}

async function copyToken() {
    const sourceNode = document.getElementById('enc-token');
    const button = document.querySelector('#token-result .copy-btn');
    return copyFromNode(sourceNode, button);
}

window.copyCodeBlock = copyCodeBlock;
window.copyInstallCommand = copyInstallCommand;
window.copyToken = copyToken;

// ==================== Mode Selection ====================

function selectMode(mode) {
    selectedMode = mode;
    
    // Update UI
    function buildApiDocsContent({ baseUrl, mode, exchange = 'okx', encToken = null, credentialsStr = null }) {
        const directCredentials = buildDirectCredentialsSnippet(exchange, credentialsStr);
        const onlineToken = encToken || 'YOUR_ENCRYPTED_TOKEN';
        const localReadQuery = buildDirectQueryString(exchange);
        const demoReadQuery = `${localReadQuery}&testnet=true`;
        const title = mode === 'online'
            ? '# TradeArk API Documentation (Online Mode)'
            : '# TradeArk API Documentation (Local Mode)';
        const authSummary = mode === 'online'
            ? '# Preferred auth in these examples: enc token'
            : '# Preferred auth in these examples: direct api_key, secret_key, and optional passphrase';
        const positionsExample = mode === 'online'
            ? `curl -X GET "${baseUrl}/positions?exchange=${exchange}&enc=${onlineToken}"`
            : `curl -X GET "${baseUrl}/positions?${localReadQuery}"`;
        const historyExample = mode === 'online'
            ? `curl -X GET "${baseUrl}/orders-history?exchange=${exchange}&enc=${onlineToken}&asset_type=swap&limit=100"`
            : `curl -X GET "${baseUrl}/orders-history?${localReadQuery}&asset_type=swap&limit=100"`;
        const directCredentialsLines = directCredentials
            .slice(1, -1)
            .replace(/, /g, ',\n      ');
        const localOrderAuthBlock = `"api_key": "YOUR_API_KEY",
        "secret_key": "YOUR_SECRET_KEY",${exchange === 'okx' || exchange === 'bitget' ? '\n        "passphrase": "YOUR_PASSPHRASE",' : ''}
        "testnet": false`;
        const localCloseAllAuthBlock = `"api_key": "YOUR_API_KEY",
        "secret_key": "YOUR_SECRET_KEY",${exchange === 'okx' || exchange === 'bitget' ? '\n        "passphrase": "YOUR_PASSPHRASE",' : ''}
        "testnet": false`;
        const orderAuthBlock = mode === 'online'
            ? `"enc": "${onlineToken}"`
            : localOrderAuthBlock;
        const closeAllAuthBlock = mode === 'online'
            ? `"enc": "${onlineToken}"`
            : localCloseAllAuthBlock;

        return `${title}
# Base URL: ${baseUrl}
# Exchange: ${exchange.toUpperCase()}
${authSummary}

================================================================================
## Quick Start
================================================================================

1. Call GET /health to confirm the service is online.
2. Call GET /positions or GET /orders-history to validate credentials and exchange access.
3. Set testnet=true when you want to target a supported demo or testnet environment.
4. Omit testnet or set it to false for live trading.

Important notes:
- Local mode uses direct api_key, secret_key, and passphrase fields.
- testnet=true is supported for all five exchanges: OKX, Binance, Bybit, Bitget, and Gate.
- Demo or testnet mode often requires exchange-specific demo API keys.

================================================================================
## Endpoint Summary
================================================================================

| Method | Endpoint         | Purpose |
|--------|------------------|---------|
| GET    | /                | Health alias for /health |
| GET    | /health          | Service readiness check |
| GET    | /positions       | Balances, holdings, futures positions |
| GET    | /orders-history  | Filled order history |
| POST   | /place-order     | Place a market or limit order |
| POST   | /cancel-order    | Cancel an open order by order_id |
| POST   | /close-all       | Close positions or liquidate holdings |
| POST   | /set-tpsl        | Place TP/SL conditional orders |
| POST   | /cancel-tpsl     | Cancel TP/SL orders by order_id |

================================================================================
## GET /positions
================================================================================

### Request Example:
${positionsExample}

### Demo/Testnet Example:
curl -X GET "${baseUrl}/positions?${demoReadQuery}"

### Query Parameters:
| Field      | Type   | Required | Description |
|------------|--------|----------|-------------|
| exchange   | string | Yes      | okx, binance, bitget, gate, bybit |
| enc        | string | Cond.    | Encrypted online credentials |
| api_key    | string | Cond.    | Direct local API key |
| secret_key | string | Cond.    | Direct local API secret |
| passphrase | string | Cond.    | Required for OKX / Bitget direct mode |
| testnet    | bool   | No       | Set true to read a supported demo/testnet account |

================================================================================
## GET /orders-history
================================================================================

### Request Example:
${historyExample}

### Demo/Testnet Example:
curl -X GET "${baseUrl}/orders-history?${demoReadQuery}&asset_type=swap&symbol=BTCUSDT&limit=50"

### Query Parameters:
| Field      | Type   | Required | Description |
|------------|--------|----------|-------------|
| exchange   | string | Yes      | okx, binance, bitget, gate, bybit |
| enc        | string | Cond.    | Encrypted online credentials |
| api_key    | string | Cond.    | Direct local API key |
| secret_key | string | Cond.    | Direct local API secret |
| passphrase | string | Cond.    | Required for OKX / Bitget direct mode |
| testnet    | bool   | No       | Set true to read a supported demo/testnet account |
| asset_type | string | No       | spot or swap |
| symbol     | string | No       | Symbol filter, e.g. BTCUSDT |
| limit      | number | No       | Max results, default 100 |

================================================================================
## POST /place-order
================================================================================

### Market Order Example:
curl -X POST "${baseUrl}/place-order" \\
  -H "Content-Type: application/json" \\
  -d '{
    "symbol": "BTCUSDT",
    "exchange": "${exchange}",
    "asset_type": "swap",
    "side": "buy",
    "quantity": 0.1,
    "leverage": 10,
    "margin_mode": "cross",
    "position_side": "long",
    "action": "open",
    "auto_reverse": 1,
    ${orderAuthBlock}
  }'

### Limit Order Example:
curl -X POST "${baseUrl}/place-order" \\
  -H "Content-Type: application/json" \\
  -d '{
    "symbol": "BTCUSDT",
    "exchange": "${exchange}",
    "asset_type": "swap",
    "side": "buy",
    "quantity": 0.1,
    "order_type": "limit",
    "price": 50000.0,
    "position_side": "long",
    "action": "open",
    ${orderAuthBlock}
  }'

### Body Fields:
| Field         | Type    | Required | Description |
|---------------|---------|----------|-------------|
| symbol        | string  | Yes      | BTCUSDT or BTC/USDT input accepted |
| exchange      | string  | Yes      | okx, binance, bitget, gate, bybit |
| asset_type    | string  | Yes      | spot or swap |
| side          | string  | Yes      | buy or sell |
| quantity      | number  | Yes      | Must be greater than zero |
| order_type    | string  | No       | market (default) or limit |
| price         | number  | Cond.    | Required when order_type=limit; must match exchange tick size |
| leverage      | number  | No       | Swap only, default 1 |
| margin_mode   | string  | No       | cross or isolated |
| position_side | string  | No       | long, short, or omit in one-way mode |
| action        | string  | No       | open or close |
| auto_reverse  | number  | No       | 1 closes opposite swap side before opening |
| enc           | string  | Cond.    | Online encrypted credentials |
| api_key       | string  | Cond.    | Direct local API key |
| secret_key    | string  | Cond.    | Direct local API secret |
| passphrase    | string  | Cond.    | Required for OKX / Bitget direct mode |
| testnet       | boolean | No       | Route the request to a supported demo/testnet environment when true |

Note: /order is accepted as a legacy alias for /place-order.

================================================================================
## POST /cancel-order
================================================================================

Cancel an open (non-TP/SL) order using the order_id from /place-order.

### Request Example:
curl -X POST "${baseUrl}/cancel-order" \\
  -H "Content-Type: application/json" \\
  -d '{
    "exchange": "${exchange}",
    "symbol": "BTCUSDT",
    "asset_type": "swap",
    "order_id": "ORDER_ID_FROM_PLACE_ORDER",
    ${orderAuthBlock}
  }'

### Body Fields:
| Field      | Type    | Required | Description |
|------------|---------|----------|-------------|
| exchange   | string  | Yes      | okx, binance, bitget, gate, bybit |
| symbol     | string  | Yes      | Trading pair |
| asset_type | string  | Yes      | spot or swap — must match original order |
| order_id   | string  | Yes      | The order_id returned by /place-order |
| enc        | string  | Cond.    | Online encrypted credentials |
| api_key    | string  | Cond.    | Direct local API key |
| secret_key | string  | Cond.    | Direct local API secret |
| passphrase | string  | Cond.    | Required for OKX / Bitget direct mode |
| testnet    | boolean | No       | Must match the environment of the original order |

================================================================================
## POST /cancel-tpsl
================================================================================

Cancel active TP/SL orders. For swap, passes both TP and SL IDs to clear them from the position.

### Request Example:
curl -X POST "${baseUrl}/cancel-tpsl" \\
  -H "Content-Type: application/json" \\
  -d '{
    "exchange": "${exchange}",
    "symbol": "BTCUSDT",
    "asset_type": "swap",
    "tp_order_id": "TP_ORDER_ID",
    "sl_order_id": "SL_ORDER_ID",
    ${orderAuthBlock}
  }'

### Body Fields:
| Field         | Type    | Required | Description |
|---------------|---------|----------|-------------|
| exchange      | string  | Yes      | okx, binance, bitget, gate, bybit |
| symbol        | string  | Yes      | Trading pair |
| asset_type    | string  | Yes      | spot or swap |
| tp_order_id   | string  | Cond.    | TP order_id from /set-tpsl; at least one of tp/sl required |
| sl_order_id   | string  | Cond.    | SL order_id from /set-tpsl |
| quantity      | number  | Cond.    | Required for spot cancel-tpsl on some exchanges |
| enc           | string  | Cond.    | Online encrypted credentials |
| api_key       | string  | Cond.    | Direct local API key |
| secret_key    | string  | Cond.    | Direct local API secret |
| passphrase    | string  | Cond.    | Required for OKX / Bitget direct mode |
| testnet       | boolean | No       | Must match the environment of the original TP/SL orders |

================================================================================
## POST /close-all
================================================================================

### Request Example:
curl -X POST "${baseUrl}/close-all" \\
  -H "Content-Type: application/json" \\
  -d '{
    "symbol": "BTCUSDT",
    "exchange": "${exchange}",
    "asset_type": "swap",
    ${closeAllAuthBlock}
  }'

### Alternative Direct Credentials Body:
{
  "symbol": "BTCUSDT",
  "exchange": "${exchange}",
  "asset_type": "swap",
  ${directCredentialsLines},
  "testnet": true
}

### Body Fields:
| Field      | Type    | Required | Description |
|------------|---------|----------|-------------|
| symbol     | string  | No       | Omit to close all positions / holdings for that asset_type |
| exchange   | string  | Yes      | okx, binance, bitget, gate, bybit |
| asset_type | string  | Yes      | spot or swap |
| enc        | string  | Cond.    | Online encrypted credentials |
| api_key    | string  | Cond.    | Direct local API key |
| secret_key | string  | Cond.    | Direct local API secret |
| passphrase | string  | Cond.    | Required for OKX / Bitget direct mode |
| testnet    | boolean | No       | Route the request to a supported demo/testnet environment when true |

================================================================================
## Common Failures
================================================================================

- 400: invalid parameters, missing symbol, invalid quantity, unsupported exchange
- 401: credentials cannot be resolved or decrypted
- 500: unexpected server-side failure
`;
    }
    
    document.querySelectorAll('.mode-card').forEach((card) => {
        card.classList.toggle('active', card.id === `mode-${mode}`);
    });

    const onlineSetup = document.getElementById('online-setup');
    const localSetup = document.getElementById('local-setup');
    const tokenResult = document.getElementById('token-result');

    if (onlineSetup) {
        onlineSetup.style.display = mode === 'online' ? 'block' : 'none';
    }
    if (localSetup) {
        localSetup.style.display = mode === 'local' ? 'block' : 'none';
    }
    if (tokenResult) {
        tokenResult.style.display = 'none';
    }

    showApiDocs(mode);
}

function exchangeRequiresPassphrase(exchange) {
    return exchange === 'okx' || exchange === 'bitget';
}

function buildDirectCredentialsSnippet(exchange, credentialsStr = null) {
    if (typeof credentialsStr === 'string' && credentialsStr.trim()) {
        return credentialsStr.trim();
    }

    const fields = [
        '"api_key": "YOUR_API_KEY"',
        '"secret_key": "YOUR_SECRET_KEY"',
    ];
    if (exchangeRequiresPassphrase(exchange)) {
        fields.push('"passphrase": "YOUR_PASSPHRASE"');
    }
    return `{ ${fields.join(', ')} }`;
}

function buildDirectQueryString(exchange) {
    const params = [
        `exchange=${encodeURIComponent(exchange)}`,
        'api_key=YOUR_KEY',
        'secret_key=YOUR_SECRET',
    ];
    if (exchangeRequiresPassphrase(exchange)) {
        params.push('passphrase=YOUR_PASSPHRASE');
    }
    return params.join('&');
}

function setActiveButtonState(selector, activeValue, dataKey) {
    document.querySelectorAll(selector).forEach((button) => {
        button.classList.toggle('active', button.dataset[dataKey] === activeValue);
    });
}

function getSiteOrigin() {
    return window.location.origin.replace(/\/$/, '');
}

function getApiBaseUrl() {
    return window.API_BASE_URL || `${getSiteOrigin()}/api`;
}

function selectExchange(exchange) {
    selectedExchange = String(exchange || '').trim().toLowerCase();
    if (!selectedExchange) {
        return;
    }

    setActiveButtonState('.exchange-btn', selectedExchange, 'exchange');

    const credentialsForm = document.getElementById('credentials-form');
    if (credentialsForm) {
        credentialsForm.style.display = 'block';
    }

    const passphraseGroup = document.getElementById('passphrase-group');
    if (passphraseGroup) {
        passphraseGroup.style.display = exchangeRequiresPassphrase(selectedExchange) ? 'block' : 'none';
    }
}

function buildInstallCommand(os) {
    const origin = getSiteOrigin();
    if (os === 'windows') {
        return [
            `Invoke-WebRequest -Uri ${origin}/install.ps1 -OutFile install.ps1`,
            'powershell -ExecutionPolicy Bypass -File .\\install.ps1 -Yes',
        ].join('\n');
    }

    return `curl -fsSL ${origin}/install.sh | bash -s -- --non-interactive --skip-credentials --install-service`;
}

function selectOS(os) {
    selectedOS = String(os || '').trim().toLowerCase();
    if (!selectedOS) {
        return;
    }

    setActiveButtonState('.os-btn', selectedOS, 'os');

    const installCommand = document.getElementById('install-command');
    const installCode = document.getElementById('install-code');
    if (installCode) {
        installCode.textContent = buildInstallCommand(selectedOS);
    }
    if (installCommand) {
        installCommand.style.display = 'block';
    }
}

function showApiDocs(mode = selectedMode || 'online') {
    const apiDocsText = document.getElementById('api-docs-text');
    if (apiDocsText) {
        apiDocsText.value = generateApiDocs(getApiBaseUrl(), mode);
    }

    const apiDocsSection = document.getElementById('api-docs');
    if (apiDocsSection) {
        apiDocsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

async function copyApiDocs() {
    return copyFromNode(document.getElementById('api-docs-text'), document.querySelector('#api-docs .btn.btn-warning'));
}

async function generateEncryptedCredentials() {
    const apiKey = String(document.getElementById('api-key')?.value || '').trim();
    const secretKey = String(document.getElementById('secret-key')?.value || '').trim();
    const passphrase = String(document.getElementById('passphrase')?.value || '').trim();

    if (!apiKey || !secretKey) {
        window.alert('API key and secret key are required.');
        return;
    }

    const trigger = document.querySelector('#credentials-form .btn.btn-warning');
    const originalHtml = trigger?.innerHTML || '';
    if (trigger) {
        trigger.disabled = true;
        trigger.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Working...';
    }

    try {
        const response = await fetch(`${getApiBaseUrl()}/encrypt`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                api_key: apiKey,
                secret_key: secretKey,
                passphrase,
            }),
        });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok || !payload.success || !payload.enc) {
            throw new Error(payload.error || 'Failed to generate encrypted credentials.');
        }

        const tokenField = document.getElementById('enc-token');
        if (tokenField) {
            tokenField.value = payload.enc;
        }

        const onlineSetup = document.getElementById('online-setup');
        const tokenResult = document.getElementById('token-result');
        if (onlineSetup) {
            onlineSetup.style.display = 'none';
        }
        if (tokenResult) {
            tokenResult.style.display = 'block';
            tokenResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } catch (error) {
        window.alert(String(error?.message || error || 'Failed to generate encrypted credentials.'));
    } finally {
        if (trigger) {
            trigger.disabled = false;
            trigger.innerHTML = originalHtml;
        }
    }
}

window.selectExchange = selectExchange;
window.selectOS = selectOS;
window.showApiDocs = showApiDocs;
window.copyApiDocs = copyApiDocs;
window.generateEncryptedCredentials = generateEncryptedCredentials;

function generateApiDocs(baseUrl, mode) {
    const encNote = mode === 'online' 
        ? '// Use "enc" field with your encrypted token' 
        : '// Use "credentials" object with your API keys';
    
    return `# TradeArk API Documentation
# Base URL: ${baseUrl}

================================================================================
## AI Risk Control Firewall for Local Agents
================================================================================

TradeArk includes a local two-layer AI trading firewall for OpenClaw,
Codex, Claude Code, and similar local agents. Instead of pasting raw exchange
keys into an AI workflow, create a named AI risk client, issue a scoped token,
and keep exchange writes on /external/* where the executor enforces policy
limits before anything reaches the exchange.

1. Open the local Web UI at http://127.0.0.1:38182/
2. Click the AI Risk button in the top-right toolbar.
3. Register an AI risk client and select the allowed saved accounts.
   Each saved account already carries its own live/testnet setting.
4. Click the AI Prompt button. It rotates a fresh token and generates a full
   prompt that can carry local auth context for normal local API access plus
   the scoped trading token for protected writes.

What the protected write path can enforce before the exchange sees a request:
- Every /external/* write request must send header: x-se-client-token
- Every /external/* write request must use a saved account_id
- Do not send api_key, secret_key, or passphrase on /external/*
- Layer 1 can enforce route scope, asset scope, symbol rules, leverage caps,
  max quantity, max notional, and rate or daily limits
- Layer 2 can alert, cancel open orders, flatten swap exposure, or freeze an
  account or client when live risk thresholds trip
- Available scoped write routes are /external/order, /external/close-all,
  and /external/cancel-open-orders

Normal local API access:
- The generated AI prompt can also include current Web UI bearer auth for
  normal local routes such as balances, positions, history, settings, and
  chat tasks
- Keep exchange writes on /external/* if you want them to stay inside AI Risk
  Control

### Scoped order example (local executor only):
curl -X POST "http://127.0.0.1:38182/external/order" \
  -H "Content-Type: application/json" \
  -H "x-se-client-token: YOUR_SCOPED_AI_TOKEN" \
  -d '{
    "account_id": "YOUR_SAVED_ACCOUNT_ID",
    "exchange": "okx",
    "symbol": "BTCUSDT",
    "asset_type": "swap",
    "side": "buy",
    "quantity": 0.01,
    "leverage": 5,
    "margin_mode": "cross",
    "position_side": "long",
    "action": "open"
  }'

================================================================================
## POST /place-order - Place Trading Order
================================================================================

Place a market or limit order on the specified exchange.

### Market Order Example:
curl -X POST "${baseUrl}/place-order" \\
  -H "Content-Type: application/json" \\
  -d '{
    "symbol": "BTC/USDT",
    "exchange": "okx",
    "asset_type": "swap",
    "side": "buy",
    "quantity": 0.1,
    "leverage": 10,
    "margin_mode": "cross",
    "position_side": "long",
    "action": "open",
    "auto_reverse": 1,
    ${mode === 'online' ? '"enc": "YOUR_ENCRYPTED_TOKEN"' : '"credentials": {"api_key": "...", "secret_key": "...", "passphrase": "..."}'}
  }'

### Limit Order Example:
curl -X POST "${baseUrl}/place-order" \\
  -H "Content-Type: application/json" \\
  -d '{
    "symbol": "BTC/USDT",
    "exchange": "okx",
    "asset_type": "swap",
    "side": "buy",
    "quantity": 0.1,
    "order_type": "limit",
    "price": 50000.0,
    "leverage": 10,
    "position_side": "long",
    "action": "open",
    ${mode === 'online' ? '"enc": "YOUR_ENCRYPTED_TOKEN"' : '"credentials": {"api_key": "...", "secret_key": "...", "passphrase": "..."}'}
  }'

### Parameters:
| Field          | Type    | Required | Description                                              |
|----------------|---------|----------|----------------------------------------------------------|
| symbol         | string  | Yes      | Trading pair (e.g., "BTC/USDT")                         |
| exchange       | string  | Yes      | okx, binance, bitget, gate, bybit                       |
| asset_type     | string  | Yes      | "spot" or "swap" (perpetual)                            |
| side           | string  | Yes      | "buy" or "sell"                                         |
| quantity       | number  | Yes      | Order quantity                                          |
| order_type     | string  | No       | "market" (default) or "limit"                          |
| price          | number  | Cond.    | Required when order_type=limit; must match tick size    |
| leverage       | number  | No       | Leverage for futures (default: 1)                       |
| margin_mode    | string  | No       | "cross" or "isolated"                                   |
| position_side  | string  | No       | "long" or "short" (hedge mode)                          |
| action         | string  | No       | "open" or "close" (futures only)                        |
| auto_reverse   | number  | No       | 1 = close opposite position before opening (futures)   |
${mode === 'online' ? '| enc            | string  | Yes      | Encrypted credentials token                             |' : '| credentials    | object  | Yes      | API credentials object                                  |'}

Note: /order is accepted as a legacy alias for /place-order.

### Response:
{
  "success": true,
  "data": {
    "success": true,
    "order_id": "123456789",
    "exchange": "OKX",
    "symbol": "BTC-USDT-SWAP",
    "side": "buy",
    "quantity": "0.1"
  }
}


================================================================================
## POST /cancel-order - Cancel Order
================================================================================

Cancel an open (non-TP/SL) order using the order_id from /place-order.

### Request Example:
curl -X POST "${baseUrl}/cancel-order" \\
  -H "Content-Type: application/json" \\
  -d '{
    "exchange": "okx",
    "symbol": "BTC/USDT",
    "asset_type": "swap",
    "order_id": "ORDER_ID_FROM_PLACE_ORDER",
    ${mode === 'online' ? '"enc": "YOUR_ENCRYPTED_TOKEN"' : '"credentials": {"api_key": "...", "secret_key": "...", "passphrase": "..."}'}
  }'

### Parameters:
| Field          | Type    | Required | Description                                              |
|----------------|---------|----------|----------------------------------------------------------|
| exchange       | string  | Yes      | okx, binance, bitget, gate, bybit                       |
| symbol         | string  | Yes      | Trading pair                                            |
| asset_type     | string  | Yes      | "spot" or "swap" — must match original order            |
| order_id       | string  | Yes      | The order_id value from /place-order response           |
${mode === 'online' ? '| enc            | string  | Yes      | Encrypted credentials token                             |' : '| credentials    | object  | Yes      | API credentials object                                  |'}

### Response:
{
  "success": true,
  "data": { "exchange": "OKX", "symbol": "BTC-USDT-SWAP", "order_id": "123456789" }
}


================================================================================
## POST /close-all - Close All Positions
================================================================================

Close all positions for the specified exchange and asset type.

### Request Example:
curl -X POST "${baseUrl}/close-all" \\
  -H "Content-Type: application/json" \\
  -d '{
    "symbol": "BTC/USDT",
    "exchange": "okx",
    "asset_type": "swap",
    ${mode === 'online' ? '"enc": "YOUR_ENCRYPTED_TOKEN"' : '"credentials": {"api_key": "...", "secret_key": "...", "passphrase": "..."}'}
  }'

### Parameters:
| Field          | Type    | Required | Description                              |
|----------------|---------|----------|------------------------------------------|
| symbol         | string  | No       | Specific pair (omit to close all)       |
| exchange       | string  | Yes      | okx, binance, bitget, gate, bybit       |
| asset_type     | string  | Yes      | "spot" or "swap"                        |
${mode === 'online' ? '| enc            | string  | Yes      | Encrypted credentials token             |' : '| credentials    | object  | Yes      | API credentials object                  |'}

### Response:
{
  "success": true,
  "data": [
    {
      "success": true,
      "order_id": "123456789",
      "exchange": "OKX",
      "symbol": "BTC-USDT-SWAP",
      "side": "sell",
      "quantity": "0.1"
    }
  ]
}


================================================================================
## GET /positions - Get Account Positions
================================================================================

Get all positions, balances, and spot holdings.

### Request Example:
${mode === 'online' 
? `curl -X GET "${baseUrl}/positions?exchange=okx&enc=YOUR_ENCRYPTED_TOKEN"`
: `curl -X GET "${baseUrl}/positions?exchange=okx&api_key=YOUR_KEY&secret_key=YOUR_SECRET&passphrase=YOUR_PASSPHRASE"`}

### Parameters (Query String):
| Field          | Type    | Required | Description                              |
|----------------|---------|----------|------------------------------------------|
| exchange       | string  | Yes      | okx, binance, bitget, gate, bybit       |
${mode === 'online'
? `| enc            | string  | Yes      | Encrypted credentials token             |`
: `| api_key        | string  | Yes      | Your API key                            |
| secret_key     | string  | Yes      | Your secret key                         |
| passphrase     | string  | No       | Passphrase (required for OKX/Bitget)    |`}

### Response:
{
  "success": true,
  "data": {
    "exchange": "OKX",
    "futures_positions": [
      {
        "symbol": "BTC-USDT-SWAP",
        "side": "long",
        "size": "0.1",
        "entry_price": "45000.00",
        "unrealized_pnl": "50.00",
        "leverage": 10,
        "margin_mode": "cross"
      }
    ],
    "spot_holdings": [
      {
        "currency": "USDT",
        "available": "1000.00",
        "frozen": "0.00"
      }
    ],
    "balances": [
      {
        "currency": "USDT",
        "available": "1000.00",
        "frozen": "0.00",
        "total": "1000.00"
      }
    ]
  }
}


================================================================================
## GET /orders-history - Get Historical Filled Orders
================================================================================

Get historical filled orders for the account.

### Request Example:
${mode === 'online'
? `curl -X GET "${baseUrl}/orders-history?exchange=okx&enc=YOUR_ENCRYPTED_TOKEN&asset_type=swap&limit=100"`
: `curl -X GET "${baseUrl}/orders-history?exchange=okx&api_key=YOUR_KEY&secret_key=YOUR_SECRET&passphrase=YOUR_PASSPHRASE&asset_type=swap&limit=100"`}

### Parameters (Query String):
| Field          | Type    | Required | Description                              |
|----------------|---------|----------|------------------------------------------|
| exchange       | string  | Yes      | okx, binance, bitget, gate, bybit       |
${mode === 'online'
? `| enc            | string  | Yes      | Encrypted credentials token             |`
: `| api_key        | string  | Yes      | Your API key                            |
| secret_key     | string  | Yes      | Your secret key                         |
| passphrase     | string  | No       | Passphrase (required for OKX/Bitget)    |`}
| asset_type     | string  | No       | "spot" or "swap" (omit for both)        |
| symbol         | string  | No       | Filter by specific symbol               |
| limit          | number  | No       | Max orders to return (default: 100)     |

### Response:
{
  "success": true,
  "data": {
    "exchange": "OKX",
    "orders": [
      {
        "order_id": "123456789",
        "symbol": "BTC-USDT-SWAP",
        "side": "buy",
        "position_side": "long",
        "quantity": "0.1",
        "price": "50000.50",
        "value": "5000.05",
        "fee": "2.50",
        "fee_currency": "USDT",
        "leverage": 10,
        "margin_mode": "cross",
        "asset_type": "swap",
        "created_at": "2026-01-31T10:00:00Z",
        "filled_at": "2026-01-31T10:00:01Z"
      }
    ],
    "total": 1
  }
}


================================================================================
## Supported Exchanges
================================================================================

| Exchange  | ID      | Spot | Futures | Passphrase Required |
|-----------|---------|------|---------|---------------------|
| OKX       | okx     | ✓    | ✓       | Yes                 |
| Binance   | binance | ✓    | ✓       | No                  |
| Bitget    | bitget  | ✓    | ✓       | Yes                 |
| Gate.io   | gate    | ✓    | ✓       | No                  |
| Bybit     | bybit   | ✓    | ✓       | No                  |


================================================================================
## Error Responses
================================================================================

{
  "success": false,
  "error": "Error message description"
}

Common error codes:
- 400: Bad Request (invalid parameters)
- 401: Unauthorized (invalid credentials)
- 500: Internal Server Error
`;
}

// ==================== Initialize ====================

document.addEventListener('DOMContentLoaded', function() {
    // Generate default API docs
    const defaultDocs = generateApiDocs(window.API_BASE_URL || 'https://api.tradeark.ai', 'online');
  const apiDocsText = document.getElementById('api-docs-text');
  if (apiDocsText) {
    apiDocsText.value = defaultDocs;
  }

    document.querySelectorAll('.exchange-btn').forEach((button) => {
        button.addEventListener('click', () => selectExchange(button.dataset.exchange));
    });

    document.querySelectorAll('.os-btn').forEach((button) => {
        button.addEventListener('click', () => selectOS(button.dataset.os));
    });

    document.querySelectorAll('.toggle-visibility').forEach((button) => {
        button.addEventListener('click', () => {
            const input = button.parentElement?.querySelector('input');
            const icon = button.querySelector('i');
            if (!input) {
                return;
            }
            const nextType = input.type === 'password' ? 'text' : 'password';
            input.type = nextType;
            if (icon) {
                icon.className = nextType === 'password' ? 'bi bi-eye' : 'bi bi-eye-slash';
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
