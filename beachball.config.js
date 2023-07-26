/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const {execSync} = require("child_process")
/** @type {import("beachball").BeachballConfig } */
module.exports = {
  bumpDeps: false,
  access: "public",
  tag: "latest",
  scope: ["packages/**"],
  ignorePatterns: [".nycrc", "eslint.config.js", ".mocharc.json", "tsconfig.*", ".*ignore", ".github/**", ".vscode/**", "**/test/**", "pnpm-lock.yaml"],
  changehint: "Run 'pnpm change' to generate a change file",
  changelog: {
    customRenderers: {
      renderEntry: (entry) => {
        const commitMessage = execSync("git log -1 --pretty=format:%s " + entry.commit).toString();
        return `- ${entry.comment} ([commit](${commitMessage}))`;
      },
    },
  },
  publish: true,
};
