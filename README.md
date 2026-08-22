# Heyrafiki Docs

This directory is the repository-owned source for the Heyrafiki Mintlify site.

## What this repository is for

This is the source for the Heyrafiki developer site. It helps Developers and
institutional teams use the published API, SDKs, Webhooks and MCP access with
clear examples and versioned guidance.

The Docs explain each release. The OpenAPI definition and source repositories
remain the technical source of truth.

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

Keep the site concise. Generated reference, SDK, Webhook and MCP pages follow reviewed versioned definitions and compatibility policies.

`openapi/heyrafiki.openapi.yaml` is the published API definition. Narrative pages explain it and never redefine it.

## License

Documentation is licensed under [CC BY 4.0](./LICENSE).
