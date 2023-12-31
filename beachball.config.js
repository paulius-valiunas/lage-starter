/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { execSync } = require("child_process");
const { url } = require("inspector");

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
        // %s = subject
        const commitMessage = execSync(`git log -1 --pretty=format:%s ${entry.commit}`, { encoding: "utf-8" });
        // match PR links
        const match = commitMessage.match(prRegex);
        return `- ${entry.comment}${getPRLink(match?.[1])}`;
      },
    },
  },
  publish: true,
};

const remoteUrl = execSync("git remote get-url origin", { encoding: "utf-8" }).trim();
const prPrefix = getPRPrefix(remoteUrl);
const prRegex = prPrefix.startsWith("https://github.com")
  ? /#([0-9]+)/
  : /^Merged PR ([0-9]+):/;

/** @type {(a:string) => string | undefined} */
function getPRPrefix(url) {
  if (url.startsWith("https://github.com")) // GitHub HTTPS
    return url.replace(/\.git$/, "") + "/pull/";
  if (url.includes("@github.com")) // GitHub SSH
    return `https://github.com/${url.split(":")[1].replace(/\.git$/, "")}/pull/`;

  if (url.includes("bentleycs")) { // Azure DevOps
    if (url.startsWith("https://")) { // HTTPS
      const parsedUrl = new URL(url);
      const repoPath = parsedUrl.pathname.replace(/^\/bentleycs/, "");
      return `https://dev.azure.com/bentleycs${repoPath}/pullrequest/`;
    }
    else { // SSH
      /** @type {string | undefined} */
      const repoPath = url.split("/bentleycs/")[1]?.split("/");
      if (repoPath) {
        return `https://dev.azure.com/bentleycs/${repoPath[0]}/_git/${repoPath[1]}/pullrequest/`
      }
    }
  }
}

/** @type {(a?: string) => string | undefined} */
function getPRLink(pr) {
  if (prPrefix && pr)
    return ` ([#${pr}](${prPrefix}${pr}))`;
  return "";
}
