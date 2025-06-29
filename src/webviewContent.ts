import * as vscode from 'vscode';

export function getWebviewContent(styleUri: vscode.Uri): string {
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Task Manager</title>
		<link rel="stylesheet" href="${styleUri}">
	</head>
	<body>
		<div class="kanban">
			<div class="column"><h2>TODO</h2></div>
			<div class="column"><h2>DOING</h2></div>
			<div class="column"><h2>DONE</h2></div>
		</div>
	</body>
	</html>`;
}
