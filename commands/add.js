const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const add = (file) => {
  if (!fs.existsSync(file)) {
    console.log(`File ${file} not found.`);
    return;
  }

  const content = fs.readFileSync(file, 'utf-8');
  const hash = crypto.createHash('sha1').update(content).digest('hex');

  const objectsPath = path.join(process.cwd(), '.minigit', 'objects');
  fs.writeFileSync(path.join(objectsPath, hash), content);

  const indexPath = path.join(process.cwd(), '.minigit', 'index.json');
  const index = JSON.parse(fs.readFileSync(indexPath));
  index[file] = hash;
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));

  console.log(`Staged ${file}`);
};

module.exports = add;
