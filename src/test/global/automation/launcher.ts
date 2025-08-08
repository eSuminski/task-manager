import { spawn, ChildProcess } from 'child_process';
import * as os from 'os';
import * as path from 'path';
import { LaunchOptions } from './types';

export function buildLaunchArgs(opts: LaunchOptions): string[] {
  return [
    opts.workspacePath,
    '--new-window',
    '--disable-gpu',
    '--disable-updates',
    '--disable-telemetry',
    '--skip-welcome',
    '--skip-release-notes',
    '--no-proxy-server',
    '--disable-workspace-trust',
    '--user-data-dir', opts.userDataDir,
    '--extensions-dir', opts.extensionsDir,
    '--extensionDevelopmentPath', opts.extensionDevPath,
    `--remote-debugging-port=${opts.remoteDebuggingPort}`,
  ];
}

function isVSCodeVisible() {
  return process.argv.includes('--vscode-visible') ? false : true;
}

export function launchVSCode(executable: string, args: string[]): ChildProcess {
    return spawn(executable, args, { stdio: ['ignore', 'ignore', 'ignore'], windowsHide: isVSCodeVisible() });
}

export function makeTempDirs() {
  const userDataDir = require('fs').mkdtempSync(path.join(os.tmpdir(), 'vscode-user-'));
  const extensionsDir = require('fs').mkdtempSync(path.join(os.tmpdir(), 'vscode-exts-'));
  return { userDataDir, extensionsDir };
}
