const path = require('node:path');
const { runCommand } = require('./lib/runCommand');

(async () => {
  try {
    const pnpmCommand = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
    await runCommand(pnpmCommand, ['run', 'build'], {
      cwd: path.resolve(__dirname, '..'),
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
})();
