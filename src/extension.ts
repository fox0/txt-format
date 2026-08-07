import * as vs from 'vscode';
import { processText, countWords } from './text';

function wikify() {
	console.log('wikify');

	const editor: vs.TextEditor | undefined = vs.window.activeTextEditor;
	if (!editor) {
		vs.window.showInformationMessage('Нет открытого файла!');
		return;
	}

	let text: string = editor.document.getText();
	let text_length: number = text.length;

	text = processText(text);
	text = text + '\n\n--\n'
		+ 'число слов: ' + String(countWords(text)) + '\n'
		+ 'число знаков: ' + String(text.length) + '\n';

	editor.edit((editBuilder: vs.TextEditorEdit) => {
		const pos0: vs.Position = new vs.Position(0, 0);
		const pos1: vs.Position = editor.document.positionAt(text_length);
		const range: vs.Range = new vs.Range(pos0, pos1);
		editBuilder.replace(range, text);
	});
}

/**
 * This method is called when your extension is activated
 * Your extension is activated the very first time the command is executed
 */
export function activate(context: vs.ExtensionContext) {
	console.log('activate');

	const COPY_WITH_SYNTAX_HIGHLIGHTING = 'editor.copyWithSyntaxHighlighting';

	vs.workspace.getConfiguration().update(COPY_WITH_SYNTAX_HIGHLIGHTING, false, vs.ConfigurationTarget.Global);

	// The commandId parameter must match the command field in package.json
	const COMMAND_ID = 'txt-format.wikify';

	const disposable = vs.commands.registerCommand(COMMAND_ID, wikify);
	context.subscriptions.push(disposable);
}

/**
 * This method is called when your extension is deactivated
 */
export function deactivate() {
	console.log('deactivate');
}
