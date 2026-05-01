# FCL Docs

Documentation site for [Full Circle Labs](https://fullcirclelabs.bio), built with [Docusaurus 3](https://docusaurus.io/) and deployed at [docs.fcl.bio](https://docs.fcl.bio).

## Setup

Create and activate the conda environment (Node 20), then install dependencies:

```bash
conda env create -f environment.yml
conda activate fcl-docs
npm install
```

## Development

```bash
npm run start        # local dev server with hot reload
```

## Building

The build pipeline runs three stages: generate API docs → build static site → generate `llms.txt`.

```bash
npm run build        # full build
npm run serve        # serve the built site locally
```

To regenerate only the API reference docs from the OpenAPI spec:

```bash
npm run gen-api-docs   # regenerate docs/reference/ from static/openapi/
npm run clean-api-docs # delete all generated files in docs/reference/
```

## Docs structure

```
docs/
  home/               # manual — landing page
  documentation/      # manual — how-to guides (orders, virtual cards, results…)
  api/                # manual — API guides (quickstart, auth, making requests, AI agents)
  reference/          # generated — do not edit (API endpoint docs)
static/
  openapi/
    fcl-api-v1.yaml   # OpenAPI spec — single source of truth, served at /openapi/fcl-api-v1.yaml
```

## API reference

API docs are auto-generated from `static/openapi/fcl-api-v1.yaml` — **never edit `docs/reference/` manually**.

To update the API reference: edit `static/openapi/fcl-api-v1.yaml`, then run `npm run gen-api-docs`.

The same file is served directly from the docs site at `/openapi/fcl-api-v1.yaml`.

> `docs/reference/` is gitignored (regenerated at build time). Do not commit files from that directory.

## Type checking

```bash
npm run typecheck
```
