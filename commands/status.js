const fs = require('fs');
const path = require('path');
const { getFileHash, loadStagingArea } = require('../utils/fileSystem');

function status() {
  const staged = loadStagingArea();
  const modified = [];
  const unstaged = [];
  const stagedFiles = Object.keys(staged);

  const files = fs.readdirSync('.');

  files.forEach(file => {
    const stat = fs.statSync(file);

    // Skip directories and MiniGit system folder
    if (stat.isDirectory() || file === '.minigit' || file === 'node_modules') {
      return;
    }

    const currentHash = getFileHash(file);
    const stagedHash = staged[file];

    if (stagedHash) {
      if (stagedHash !== currentHash) {
        modified.push(file);
      }
    } else {
      unstaged.push(file);
    }
  });

  console.log('\n>> 📦 Staged Files:');
  if (stagedFiles.length > 0) {
    stagedFiles.forEach(file => console.log('   •', file));
  } else {
    console.log('   (none)');
  }

  console.log('\n>> ✏️ Modified After Staging:');
  if (modified.length > 0) {
    modified.forEach(file => console.log('   •', file));
  } else {
    console.log('   (none)');
  }

  console.log('\n>> ➕ Untracked Files:');
  if (unstaged.length > 0) {
    unstaged.forEach(file => console.log('   •', file));
  } else {
    console.log('   (none)');
  }

  console.log('');
}

module.exports = status;
