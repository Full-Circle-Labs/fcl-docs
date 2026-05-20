# FCL Docs

Documentation site for [Full Circle Labs](https://fullcirclelabs.bio), built with [Docusaurus 3](https://docusaurus.io/) and deployed at [docs.fullcirclelabs.bio](https://docs.fullcirclelabs.bio).

## Setup

Create and activate the conda environment, then install Node dependencies:

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

To regenerate only the API reference docs from the OpenAPI specs:

```bash
npm run gen-api-docs   # regenerate docs/api/ from openapi/
npm run clean-api-docs # delete all generated files in docs/api/
```

## API Reference

API docs are auto-generated from the OpenAPI specs in `openapi/` — do not edit `docs/api/` manually.

| Spec | Description | Output |
|---|---|---|
| `openapi/fcl-api-v0.yaml` | Sample Download API | `docs/api/v0/` |
| `openapi/fcl-api-v1.yaml` | Main API | `docs/api/v1/` |

To update the API reference: edit the relevant spec file, then run `npm run gen-api-docs`.

## Docs structure

```
docs/
  intro.mdx               # Landing page
  getting-started/        # Auth, quickstart
  guides/                 # How-to guides
  reference/              # Rate limits, changelog
  api/                    # Generated — do not edit
openapi/
  fcl-api-v0.yaml         # Sample Download API spec
  fcl-api-v1.yaml         # Main API spec
```
