/**
 * Playwright global setup for VS Code end-to-end tests.
 *
 * Responsibilities:
 * - Load environment variables from a project-root .env (no external deps, best-effort) before reading process.env.
 * - Discover a VS Code executable (prefers provided path from env/.env, then common installs).
 * - Launch VS Code with a temporary user-data and extensions directory.
 * - Open the automation workspace and enable remote debugging.
 * - Wait until the DevTools endpoint is available and persist it for tests.
 *
 * Environment variables (optional):
 * - VSCODE_EXECUTABLE | CODE_EXECUTABLE: Absolute path to Code.exe to use (can be supplied via .env).
 * - VSCODE_EXTENSION_DEV_PATH: Override extensionDevelopmentPath (defaults to repo root).
 * - VSCODE_TEST_WORKSPACE: Override the workspace folder opened by VS Code.
 * - PW_VSCODE_REMOTE_DEBUG_PORT: Pin a specific remote debugging port.
 *
 * Outputs:
 * - Writes test/.vscode-automation.json with { pid, wsEndpoint, userDataDir, extensionsDir }.
 * - Sets PW_VSCODE_WS_ENDPOINT and PW_VSCODE_INFO for test fixtures to consume.
 */
import * as fs from 'fs';
import { loadEnvFrom } from './automation/env';
import { getExtensionDevPath, getInfoPath, getProjectRoot, getWorkspacePath } from './automation/paths';
import { findFreePort, waitForWebSocketDebuggerUrl } from './automation/network';
import { resolveVSCodeExecutable } from './automation/vscodeExecutable';
import { buildLaunchArgs, launchVSCode, makeTempDirs } from './automation/launcher';
import { writeAutomationInfo } from './automation/persist';
import type { AutomationInfo } from './automation/types';

const INFO_PATH = getInfoPath(__dirname);

/**
 * Launch a VS Code instance configured for E2E automation and persist its connection info.
 */
export default async function globalSetup() {
  try { fs.rmSync(INFO_PATH, { force: true }); } catch {}

  // Load .env from project root (same as extensionDevelopmentPath default)
  const projectRoot = getProjectRoot(__dirname);
  loadEnvFrom(projectRoot);

  const vscodeExecutablePath = resolveVSCodeExecutable();
  const { userDataDir, extensionsDir } = makeTempDirs();
  const extensionDevelopmentPath = getExtensionDevPath(projectRoot);
  const workspacePath = getWorkspacePath(__dirname);
  const remoteDebuggingPort = Number(process.env.PW_VSCODE_REMOTE_DEBUG_PORT) || await findFreePort();

  const args = buildLaunchArgs({
    workspacePath,
    userDataDir,
    extensionsDir,
    extensionDevPath: extensionDevelopmentPath,
    remoteDebuggingPort,
  });

  const proc = launchVSCode(vscodeExecutablePath, args);

  const wsEndpoint = await waitForWebSocketDebuggerUrl(remoteDebuggingPort);

  const info: AutomationInfo = { pid: proc.pid, wsEndpoint, userDataDir, extensionsDir };
  
  writeAutomationInfo(INFO_PATH, info);

  process.env.PW_VSCODE_WS_ENDPOINT = wsEndpoint;
  process.env.PW_VSCODE_INFO = INFO_PATH;
}
