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

The live site deploys from the private `heyrafiki/docs` repository after that repository is connected in the Mintlify dashboard.

Do not add API, SDK, Webhook endpoint or MCP reference pages until the corresponding specification is authoritative and reviewed.
