"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "allToTS-sample" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        // vscode.window.showInformationMessage('Hello !');
        const panel = vscode.window.createWebviewPanel('sourceFile', // Identifies the type of the webview. Used internally
        'Source File', // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in.
        {} // Webview options. More on these later.
        );
        panel.webview.html = `<!DOCTYPE html>
		  <html lang="en">
		  <head>
			  <meta charset="UTF-8">
			  <meta http-equiv="X-UA-Compatible" content="IE=edge">
			  <meta name="viewport" content="width=device-width, initial-scale=1.0">
			  <title>Source File</title>
		  </head>
		  <style>
				.textarea-wrapper{
					width: 300px;
					height: 100vh;
				}
				.json-source{
					padding:10px;
					border:1px solide #eee
					width:100%
					height:80vh
					display:block
					resize:none
				}

		  </style>
		  <body>
			  <div class="textarea-wrapper">
				<textarea class="json-source">
				</textarea>
			  </div>
			  <button id="action-getts">get ts</button>
			  <script>

				const $getTsElem = document.getElementById("action-getts");
				$getTsElem && $getTsElem.addEventListener('click', function() {
					console.log(1)

				})
			  </script>
		  </body>
		  </html>`;
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map