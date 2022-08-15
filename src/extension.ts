// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path'
import * as fse from 'fs-extra'
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "allToTS-sample" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello !');
	});

	const trans2Ts = vscode.commands.registerCommand('allToTs.trans2TS',() => {
		vscode.window.showInformationMessage('hi~ trans2TS')

		const panel = vscode.window.createWebviewPanel(
			'sourceFile', // Identifies the type of the webview. Used internally
			'Source File', // Title of the panel displayed to the user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in.
			{
				localResourceRoots:[
					vscode.Uri.file(
						path.join(context.extensionPath,"media")
					)
				],
				enableScripts:true,
			} // Webview options. More on these later.
		  );
		const webview = panel.webview
		 webview.onDidReceiveMessage(message => {
			switch(message.command){
				case 'write-file':
					console.log(message.text)
					break
				case 'cache-value':
					// console.log(message.text)
					break
				default:
					break
			}
		 })
		  const scriptPath = vscode.Uri.joinPath(context.extensionUri,"media","main.js")
		  const scriptUri = webview.asWebviewUri(scriptPath)

		  const styleResetPath = vscode.Uri.joinPath(context.extensionUri, 'media', 'reset.css');
		  const stylesPathMainPath = vscode.Uri.joinPath(context.extensionUri, 'media', 'vscode.css');
  
		  const stylesResetUri = webview.asWebviewUri(styleResetPath);
		  const stylesMainUri = webview.asWebviewUri(stylesPathMainPath);

		  panel.webview.html = `<!DOCTYPE html>
		  <html lang="en">
		  <head>
			  <meta charset="UTF-8">
			  <meta http-equiv="X-UA-Compatible" content="IE=edge">
			  <meta name="viewport" content="width=device-width, initial-scale=1.0">

			  <link href="${stylesResetUri}" rel="stylesheet">
			  <link href="${stylesMainUri}" rel="stylesheet">
			  <title>Source File</title>
		  </head>

		  <body>
			  <div class="textarea-wrapper">
				<textarea class="json-source" placeholder="粘贴json数据" id="json-content">
				</textarea>
				<p class="ts-result" id="ts-content">
				</p>
			  </div>
			  <button id="action-getts" class="action-item">get ts</button>
			  <script src="${scriptUri}">
			  </script>
		  </body>
		  </html>`
	})
	context.subscriptions.push(disposable);
	context.subscriptions.push(trans2Ts)
}
