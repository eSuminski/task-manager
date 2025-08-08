/**
 * Playwright global teardown for VS Code end-to-end tests.
 *
 * Responsibilities:
 * - Read persisted automation info and terminate the VS Code process (best effort).
 * - Remove temporary user data and extensions directories.
 * - Remove the info file.
 */
import * as fs from 'fs';
import { readAutomationInfo } from './automation/persist';
import { getInfoPath } from './automation/paths';

const INFO_PATH = getInfoPath(__dirname);

/**
 * Stop the launched VS Code and clean up temp resources created during globalSetup.
 */
export default async function globalTeardown() {
  const info = readAutomationInfo(INFO_PATH);
  if (!info) { return; }
  const { pid, userDataDir, extensionsDir } = info;

  if (pid) {
    try { process.kill(pid); } catch {}
  }

  for (const dir of [userDataDir, extensionsDir]) {
    try { fs.rmSync(dir, { recursive: true, force: true }); } catch {}
  }

  try { fs.rmSync(INFO_PATH, { force: true }); } catch {}
}
