import * as vs from 'vscode';
const Eyo: any = require('eyo-kernel');
// import * as Eyo from 'eyo-kernel';
import * as wiki from './wikificator.js';


function processTextPre(text: string): string {
	console.log('processTextPre');
	// TODO
	return text;
}

function processTextPost(text: string): string {
	console.log('processTextPost');
	// TODO
	return text;
}

/**
 * This method is called when your extension is activated
 * Your extension is activated the very first time the command is executed
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
		let text_length: number = text.length;

		// python3 autoformat.py --pre |
		text = processTextPre(text);
		// js wikificator.js |
		text = wiki.processText(text);
		// js node_modules/eyo/bin/cli.js --stdin |
		text = safeEyo.restore(text);
		// python3 autoformat.py --post
		text = processTextPost(text);

		editor.edit((editBuilder: vs.TextEditorEdit) => {
			const pos0: vs.Position = new vs.Position(0, 0);
			const pos1: vs.Position = editor.document.positionAt(text_length);
			const range: vs.Range = new vs.Range(pos0, pos1);
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
