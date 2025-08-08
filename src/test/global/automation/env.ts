import * as fs from 'fs';
import * as path from 'path';

/**
 * Lightweight .env loader (no external dependency).
 * - Reads a .env file from the provided directory (if present) and sets process.env entries
 *   for keys that are not already defined.
 * - Supports lines of the form KEY=VALUE with optional surrounding quotes for VALUE.
 * - Ignores blank lines and lines beginning with '#'.
 */
export function loadEnvFrom(dir: string) {
  try {
    const envPath = path.join(dir, '.env');
    if (!fs.existsSync(envPath)) { return; }
    const text = fs.readFileSync(envPath, 'utf-8');
    for (const rawLine of text.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) { continue; }

      const eq = line.indexOf('=');
      if (eq === -1) { continue; }

      const key = line.slice(0, eq).trim();
      let value = line.slice(eq + 1).trim();

      // Strip surrounding single or double quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      if (!(key in process.env)) {
        process.env[key] = value;
      }
    }
  } catch {
    // Best-effort; ignore parse/load errors
  }
}

export function getVsCodeExecutableFromEnv(): string | undefined {
  return process.env.VSCODE_EXECUTABLE || process.env.CODE_EXECUTABLE;
}
