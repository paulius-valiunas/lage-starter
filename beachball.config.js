/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const {execSync} = require("child_process")
/** @type {import("beachball").BeachballConfig } */
const prRegex = /\(#[0-9]+\)/g;
module.exports = {
  access: "public",
  tag: "latest",
  scope: ["packages/**"],
  ignorePatterns: [".nycrc", "eslint.config.js", ".mocharc.json", "tsconfig.*", ".*ignore", ".github/**", ".vscode/**", "**/test/**", "pnpm-lock.yaml"],
  changehint: "Run 'pnpm change' to generate a change file",
  changelog: {
    customRenderers: {
      renderEntry: (entry) => {
        const commitMessage = execSync("git log -1 --pretty=format:%s " + entry.commit).toString();
        const matches = [...commitMessage.matchAll(prRegex)];
        return `- ${entry.comment}${matches?.length > 0 ? ` ${matches[0][0]}` : ""}`;
      },
    },
  },
  publish: true,
};
