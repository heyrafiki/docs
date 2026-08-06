# Heyrafiki Docs

This directory is the repository-owned source for the Heyrafiki Mintlify site.

## Local preview

Use Node.js 22, then run:

```bash
node scripts/check-docs.mjs
mint validate
mint broken-links --check-anchors --check-redirects
mint a11y
mint dev --no-open --port 3333
```

The live site deploys from this repository.

Keep the site concise. Generated reference, SDK, Webhook and MCP pages follow reviewed versioned contracts.

`openapi/heyrafiki.openapi.yaml` is the published API contract. Narrative pages explain it and never redefine it.

## License

Documentation is licensed under [CC BY 4.0](./LICENSE).
