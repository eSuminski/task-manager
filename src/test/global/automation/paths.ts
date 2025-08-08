import * as fs from 'fs';
import * as path from 'path';

export function getProjectRoot(currentFileDir: string): string {
  // global-setup.ts is at test/global; project root is two levels up
  return path.resolve(currentFileDir, '../../../');
}

export function getWorkspacePath(currentFileDir: string): string {
  return process.env.VSCODE_TEST_WORKSPACE || path.resolve(currentFileDir, '../automation_workspace');
}

export function getExtensionDevPath(projectRoot: string): string {
  return process.env.VSCODE_EXTENSION_DEV_PATH || projectRoot;
}

export function getInfoPath(currentFileDir: string): string {
  const infoPath = path.resolve(currentFileDir, '../.vscode-automation.json');
  try { fs.mkdirSync(path.dirname(infoPath), { recursive: true }); } catch {}
  return infoPath;
}
