const [,, cmd, ...args] = process.argv;

switch (cmd) {
  case 'init':
    require('./commands/init')();
    break;
  case 'add':
    require('./commands/add')(args[0]);
    break;
  case 'commit':
    require('./commands/commit')(args.join(' '));
    break;
  case 'log':
    require('./commands/log')();
    break;
  case 'status':
    require('./commands/status')();  // ✅ Add this line
    break;
  default:
    console.log('Commands: init, add <file>, commit <msg>, log, status'); // ✅ Also update help text
}
