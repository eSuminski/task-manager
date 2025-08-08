import * as fs from 'fs';
import * as path from 'path';
import { getVsCodeExecutableFromEnv } from './env';

export function resolveVSCodeExecutable(): string {
  const envPath = getVsCodeExecutableFromEnv();
  if (envPath && fs.existsSync(envPath)) { return envPath; }

  if (process.platform === 'win32') {
    const candidates = [
      path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Microsoft VS Code', 'Code.exe'),
      path.join(process.env['ProgramFiles(x86)'] || '', 'Microsoft VS Code', 'Code.exe'),
      path.join(process.env['ProgramFiles'] || '', 'Microsoft VS Code', 'Code.exe'),
      // Insiders
      path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Microsoft VS Code Insiders', 'Code - Insiders.exe'),
      path.join(process.env['ProgramFiles(x86)'] || '', 'Microsoft VS Code Insiders', 'Code - Insiders.exe'),
      path.join(process.env['ProgramFiles'] || '', 'Microsoft VS Code Insiders', 'Code - Insiders.exe'),
    ].filter(p => !!p && fs.existsSync(p));
    if (candidates.length) { return candidates[0]; }
  }

  return 'code';
}
