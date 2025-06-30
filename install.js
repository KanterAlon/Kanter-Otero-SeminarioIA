const { execSync } = require('child_process');
const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function runInstall(dir) {
  console.log(`\nInstalling dependencies in ${dir}...`);
  execSync(`${npmCmd} install`, { cwd: dir, stdio: 'inherit' });
}

try {
  runInstall('backend');
  runInstall('next-app');
} catch (err) {
  process.exitCode = 1;
}
