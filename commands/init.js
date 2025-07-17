const fs = require('fs');
const path = require('path');

const init = () => {
  const dir = path.join(process.cwd(), '.minigit');
  if (fs.existsSync(dir)) {
    console.log('MiniGit repo already exists.');
    return;
  }

  fs.mkdirSync(dir);
  fs.mkdirSync(path.join(dir, 'objects'));
  fs.writeFileSync(path.join(dir, 'index.json'), JSON.stringify({}));
  console.log('Initialized empty MiniGit repository.');
};

module.exports = init;
