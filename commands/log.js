const fs = require('fs');
const path = require('path');

const log = () => {
  const objectsPath = path.join(process.cwd(), '.minigit', 'objects');
  const files = fs.readdirSync(objectsPath);

  for (let file of files) {
    const content = fs.readFileSync(path.join(objectsPath, file), 'utf-8');
    try {
      const obj = JSON.parse(content);
      if (obj.message && obj.timestamp) {
        console.log(`\nCommit: ${file}`);
        console.log(`Time  : ${obj.timestamp}`);
        console.log(`Msg   : ${obj.message}`);
      }
    } catch {
      // Skip blobs
    }
  }
};

module.exports = log;
