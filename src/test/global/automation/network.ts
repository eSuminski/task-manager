import * as http from 'http';
import * as net from 'net';

export async function waitForWebSocketDebuggerUrl(port: number, timeoutMs = 90_000): Promise<string> {
  const deadline = Date.now() + timeoutMs;
  const url = `http://127.0.0.1:${port}/json/version`;
  while (Date.now() < deadline) {
    try {
      const wsUrl = await new Promise<string>((resolve, reject) => {
        const req = http.get(url, (res) => {
          if (res.statusCode !== 200) {
            res.resume();
            reject(new Error(`HTTP ${res.statusCode}`));
            return;
          }
          let data = '';
          res.setEncoding('utf8');
          res.on('data', chunk => (data += chunk));
          res.on('end', () => {
            try {
              const json = JSON.parse(data);
              if (json.webSocketDebuggerUrl) {
                resolve(json.webSocketDebuggerUrl as string);
              } else {
                reject(new Error('webSocketDebuggerUrl not found'));
              }
            } catch (e) {
              reject(e as Error);
            }
          });
        });
        req.on('error', reject);
        req.setTimeout(2000, () => {
          req.destroy(new Error('timeout'));
        });
      });
      return wsUrl;
    } catch {
      await new Promise(r => setTimeout(r, 300));
    }
  }
  throw new Error('Timed out waiting for DevTools endpoint to be ready');
}

export async function findFreePort(): Promise<number> {
  return await new Promise<number>((resolve, reject) => {
    const srv = net.createServer();
    srv.on('error', reject);
    srv.listen(0, '127.0.0.1', () => {
      const address = srv.address();
      if (typeof address === 'object' && address && 'port' in address) {
        const port = address.port;
        srv.close(() => resolve(port));
      } else {
        srv.close(() => reject(new Error('Unable to get port')));
      }
    });
  });
}
