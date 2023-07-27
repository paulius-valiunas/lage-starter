# Lage monorepo starter

This repository acts as a starter for Lage-based monorepos to help you migrate from Rush.

## Usage

1. Clone this repository
1. (optional) Try out how it works
    1. `pnpm install`
    1. `pnpm build`
    1. `pnpm --filter sample-a start`
1. For each package in your Rush monorepo:
    1. Copy it to this repository - choose the folder structure you like, you don't have to put everything in `./packages`
    1. Add it to `pnpm-workspace.yaml` (you can use glob patterns too)
1. For each entry in `command-line.json` in your old repository:
    1. Add a script to root `package.json` like this: `"<script-name>": "lage <script-name> --group`
    1. Add a Lage pipeline to `lage.config.js`. The pre-configured scripts should be a good set of examples that you can copy; see [Lage documentation](https://microsoft.github.io/lage/docs/Reference/config) for more options
1. Update the pipeline files in `.pipelines` to match your variable groups etc. and make sure you have all the pipelines you need.
1. Delete all packages from your original repository's working tree, delete the `common` folder, copy the contents of _this_ repository over to the original one and overwrite existing files if there are conflicts.
1. Commit/push these changes to your repository and re-register each pipeline in Azure DevOps UI.

## Tips for using your new monorepo

- Instead of `rush`, always use `pnpm run` to run commands. `rush build` becomes `pnpm run build`
- You can skip `run` and just do `pnpm <command>` if you know that the command is not a reserved pnpm keyword (`install`, `publish` etc.)
- If you want to run a command on a specific package only, use `--filter` before the command. For example, `pnpm --filter=sample-b build`
- Only add changelog entries when the changes require them. Adding an entry for every PR only makes the changelog harder to read.
- Prefer `workspace:^` or `workspace:~` over `workspace:*` when declaring your workspace dependencies. This will allow people to use your packages more freely without having to match the versions exactly.
- Changelog files will include links to pull requests _only if_ you use squash merging.
