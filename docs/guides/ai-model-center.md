# AI Model Center

The AI model window is the entry point for configuring model sources, the default model, and connection tests. It is a configuration center, not an immediate trading area.

![AI model center](../assets/ui/en/ai-settings.png)

## What this window usually does

- Add model configurations.
- Fill in the model name, provider, API base URL, and API key.
- Set the default model.
- Test model connectivity.
- Save the system prompt and model parameters.

## Recommended configuration order

1. Add one model configuration first.
2. Run the connection test first.
3. Only after it is confirmed usable should you set it as the default.
4. After that, go to the chart area or the auto-trade pages for actual usage.

## When to come back here

- When you want to add another model provider.
- When AI analysis fails and you want to confirm whether the issue is the model connection.
- When you want to switch the default model.

## Usage suggestions

- Treat AI as an analysis assistant first. Do not hand it direct control over real money immediately.
- Validate the model output on testnet and with small capital first.
- A model being reachable does not mean the strategy built on top of it is reliable.

Next, continue with [Chart and Timeframe Tools](chart-workspace.md) or [AI and Automation](ai-automation.md).