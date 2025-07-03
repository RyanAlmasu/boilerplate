const { spawn } = require('node:child_process');

function runCommand(command, args, options) {
  return new Promise((resolve, reject) => {
    const isWindows = process.platform === 'win32';
    const cmd = spawn(command, args, {
      stdio: 'inherit',
      shell: isWindows,
      ...options,
    });
    cmd.on('close', (code) => {
      if (code !== 0) {
        reject(
          new Error(`"${command} ${args.join(' ')}" failed with code ${code}`),
        );
      } else {
        resolve();
      }
    });
    cmd.on('error', (err) => {
      reject(err);
    });
  });
}

module.exports = { runCommand };
