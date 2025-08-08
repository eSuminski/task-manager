export interface AutomationInfo {
  pid?: number;
  wsEndpoint: string;
  userDataDir: string;
  extensionsDir: string;
}

export interface LaunchOptions {
  workspacePath: string;
  userDataDir: string;
  extensionsDir: string;
  extensionDevPath: string;
  remoteDebuggingPort: number;
}
