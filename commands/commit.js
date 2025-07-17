const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const commit = (message) => {
  const indexPath = path.join(process.cwd(), '.minigit', 'index.json');
  const index = JSON.parse(fs.readFileSync(indexPath));

  if (Object.keys(index).length === 0) {
    console.log('No files staged.');
    return;
  }

  const commitData = {
    timestamp: new Date().toISOString(),
    message,
    files: index,
  };

  const commitString = JSON.stringify(commitData);
  const commitHash = crypto.createHash('sha1').update(commitString).digest('hex');

  const objectsPath = path.join(process.cwd(), '.minigit', 'objects');
  fs.writeFileSync(path.join(objectsPath, commitHash), commitString);

  fs.writeFileSync(indexPath, JSON.stringify({}, null, 2));
  console.log(`Commit created: ${commitHash}`);
};

module.exports = commit;
