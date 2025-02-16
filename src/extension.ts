import * as vs from 'vscode';
// '@types/eyo-kernel@*' is not in this registry.
const Eyo = require('eyo-kernel');

/**
 * This method is called when your extension is activated
 * Your extension is activated the very first time the command is executed
 * @param context 
 */
export function activate(context: vs.ExtensionContext) {
	console.log('activate');

	const safeEyo = new Eyo();
	safeEyo.dictionary.loadSafeSync();

	function wikify() {
		console.log('wikify');

		const editor: vs.TextEditor | undefined = vs.window.activeTextEditor;
		if (!editor) {
			vs.window.showInformationMessage('Нет открытого файла!');
			return;
		}

		let text: string = editor.document.getText();
		
		const pos0 = new vs.Position(0, 0);
		const pos1: vs.Position = editor.document.positionAt(text.length);
		const range = new vs.Range(pos0, pos1);

		text = safeEyo.restore(text);

		// python3 autoformat.py --pre |
		// js wikificator.js |
		// js node_modules/eyo/bin/cli.js --stdin |
		// python3 autoformat.py --post

		// console.log(text);
		editor.edit((editBuilder: vs.TextEditorEdit) => {
			editBuilder.replace(range, text);
		});
	}

	// The commandId parameter must match the command field in package.json
	const COMMAND_ID = 'txt-format.txt';

	const disposable = vs.commands.registerCommand(COMMAND_ID, wikify);
	context.subscriptions.push(disposable);
}

/**
 * This method is called when your extension is deactivated
 */
export function deactivate() {
	console.log('deactivate');
}
