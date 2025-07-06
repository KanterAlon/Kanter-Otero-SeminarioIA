const { execSync } = require('child_process');
const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function runInstall(dir) {
  console.log(`\nInstalling dependencies in ${dir}...`);
  const args = '--silent --no-progress --no-audit';
  execSync(`${npmCmd} install ${args}`, { cwd: dir, stdio: 'inherit' });
}

try {
  runInstall('backend');
  runInstall('next-app');
} catch (err) {
  process.exitCode = 1;
}
