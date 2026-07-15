# Heyrafiki Docs

This directory is the repository-owned source for the Heyrafiki Mintlify site.

## Local preview

Use Node.js 22, then run:

```bash
mint validate
mint broken-links --check-anchors --check-redirects
mint a11y
mint dev --no-open --port 3333
```

The live site deploys from the private `heyrafiki/docs` repository.

Keep the public site concise. Do not publish internal architecture, provider choices, preview routes or unreleased interfaces. API, SDK, Webhook and MCP reference pages wait for reviewed public specifications.
