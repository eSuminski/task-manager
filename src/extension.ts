import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

let taskManagerPanel: vscode.WebviewPanel | undefined;

export function activate(context: vscode.ExtensionContext) {

	const openTaskManagerDisposable = vscode.commands.registerCommand('task-manager.openTaskManager', async () => {
		if(taskManagerPanel){
			taskManagerPanel.reveal();
			return;
		}
		
		taskManagerPanel = vscode.window.createWebviewPanel(
			'taskManager',
			'Task Manager',
			vscode.ViewColumn.One,
			{
				enableScripts: true,
				localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'media')]
			}
		);

		const mediaPath = vscode.Uri.joinPath(context.extensionUri, 'media');
		const indexPath = path.join(mediaPath.fsPath, 'index.html');
		let html = fs.readFileSync(indexPath, 'utf8');

        // Replace asset paths with webview URIs (only for relative paths)
        const fixUri = (asset: string) => {
            // Ignore external or already absolute URLs
            if (/^(https?:|vscode-resource:|data:|\/)/.test(asset)) {
                return asset;
            }
            if (!taskManagerPanel) {
                console.error('taskManagerPanel is undefined in fixUri');
                return asset; // fallback to original asset path
            }
            try {
                return taskManagerPanel.webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, asset));
            } catch (err) {
                console.error('Error in fixUri:', err);
                return asset;
            }
        };
		html = html.replace(/src="([^"]+)"/g, (match, src) => {
			return `src="${fixUri(src)}"`;
		});
		html = html.replace(/href="([^"]+)"/g, (match, href) => {
			return `href="${fixUri(href)}"`;
		});

		taskManagerPanel.webview.html = html;
	});

	context.subscriptions.push(openTaskManagerDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
