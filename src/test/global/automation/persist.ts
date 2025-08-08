import * as fs from 'fs';
import { AutomationInfo } from './types';

export function writeAutomationInfo(infoPath: string, info: AutomationInfo) {
  fs.writeFileSync(infoPath, JSON.stringify(info), 'utf-8');
}

export function readAutomationInfo(infoPath: string): AutomationInfo | undefined {
  try {
  if (!fs.existsSync(infoPath)) { return undefined; }
    const json = JSON.parse(fs.readFileSync(infoPath, 'utf-8')) as AutomationInfo;
    return json;
  } catch {
    return undefined;
  }
}
