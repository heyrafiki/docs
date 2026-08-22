# Heyrafiki Docs

This directory is the repository-owned source for the Heyrafiki Mintlify site.

## Where this fits

Heyrafiki is building the Intelligence and Infrastructure for Continuous Mental
Healthcare. These Docs explain the released, versioned contracts through which
Developers and institutions can participate without inventing another
representation of the same governed objects.

The Docs present behavior. OpenAPI, event catalogues, released SDKs and the
source repositories remain authoritative.

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
