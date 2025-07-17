const path = require("path");
const fs = require("fs");
const { loadStagingArea, getAllFilesRecursive, readFileHash } = require("../utils/fileSystem");

function status() {
  const staged = loadStagingArea(); // staged files from .minigit/index.json
  const workingFiles = getAllFilesRecursive(process.cwd());
  const modified = [];
  const untracked = [];

  for (const file of workingFiles) {
    const relativePath = path.relative(process.cwd(), file);
    const fileHash = readFileHash(file);

    if (staged[relativePath]) {
      if (staged[relativePath] !== fileHash) {
        modified.push(relativePath);
      }
    } else {
      untracked.push(relativePath);
    }
  }

  console.log("\n=== Staged Files ===");
  Object.keys(staged).forEach(file => console.log(file));

  console.log("\n=== Modified Files ===");
  modified.forEach(file => console.log(file));

  console.log("\n=== Untracked Files ===");
  untracked.forEach(file => console.log(file));
}

module.exports = status;
