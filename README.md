# docs_website

This folder contains a standalone user manual for TradeArk built with MkDocs and Material for MkDocs.

## Local preview

```powershell
pip install -r docs_website/requirements.txt
mkdocs serve -f docs_website/mkdocs.yml
```

Open the local preview URL printed by MkDocs, usually `http://127.0.0.1:8000`.

## Strict build check

```powershell
mkdocs build --strict -f docs_website/mkdocs.yml
```

## GitHub Pages

The workflow at `.github/workflows/docs-website.yml` builds this folder and deploys it to GitHub Pages.

GitHub Pages only hosts the static manual. The TradeArk backend, installers, and release artifacts still need to be hosted elsewhere, such as `tradeark.ai` or GitHub Releases.