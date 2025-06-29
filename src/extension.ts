import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "task-manager" is now active!');

	const disposable = vscode.commands.registerCommand('task-manager.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from task-manager!');
	});

	context.subscriptions.push(disposable);

	const openTaskManagerDisposable = vscode.commands.registerCommand('task-manager.openTaskManager', async () => {
		const panel = vscode.window.createWebviewPanel(
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
			return panel.webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, asset));
		};
		html = html.replace(/src="([^"]+)"/g, (match, src) => {
			return `src="${fixUri(src)}"`;
		});
		html = html.replace(/href="([^"]+)"/g, (match, href) => {
			return `href="${fixUri(href)}"`;
		});

		panel.webview.html = html;
	});

	context.subscriptions.push(openTaskManagerDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
