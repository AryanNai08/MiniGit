const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const stagingPath = path.join(".minigit", "index.json");

function loadStagingArea() {
  if (fs.existsSync(stagingPath)) {
    const data = fs.readFileSync(stagingPath, "utf-8");
    return JSON.parse(data);
  } else {
    return {};
  }
}

function saveStagingArea(staged) {
  fs.writeFileSync(stagingPath, JSON.stringify(staged, null, 2));
}

function getAllFilesRecursive(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);

    // Skip .minigit and node_modules
    if (fullPath.includes(".minigit") || fullPath.includes("node_modules")) {
      continue;
    }

    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      getAllFilesRecursive(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  }

  return arrayOfFiles;
}

function readFileHash(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  return crypto.createHash("sha1").update(content).digest("hex");
}

module.exports = {
  loadStagingArea,
  saveStagingArea,
  getAllFilesRecursive,
  readFileHash
};
