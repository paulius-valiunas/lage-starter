# Lage monorepo starter

This repository acts as a starter for Lage-based monorepos to help you migrate from Rush.

## Usage

1. Clone this repository
1. (optional) Try out how it works
1.1. `pnpm install`
1.1. `pnpm build`
1.1. `pnpm --filter sample-a start`
1. For each package in your Rush monorepo:
1.1. Copy it to this repository - choose the folder structure you like, you don't have to put everything in `./packages`
1.1. Add it to `pnpm-workspace.yaml`
1. For each entry in `command-line.json` in your old repository:
1.1. Add a script to root `package.json` like this: `"<script-name>": "lage <script-name> --group`
1.1. Add a Lage pipeline to `lage.config.js`. The pre-configured scripts should be a good set of examples that you can copy; see [Lage documentation](https://microsoft.github.io/lage/docs/Reference/config) for more options
1. 
