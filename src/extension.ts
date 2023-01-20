import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { Base64 } from './Base64';
import { CommandRunner, commands } from "./CommandRunner";

export function activate(context: vscode.ExtensionContext) {

	const commandRegistration = vscode.commands.registerTextEditorCommand('vsutils.convert', async () => {
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			vscode.window.showInformationMessage('No text editor active');
			return;
		}

		const selectedText = editor.document.getText(editor.selection);
		const documentText = editor.document.getText();

		const quickPick = vscode.window.createQuickPick();
		quickPick.title = 'Select a format';
		quickPick.placeholder = 'Select a format';
		quickPick.items = commands.map(c => ({ label: c.label, description: c.description }));

		quickPick.onDidHide(() => quickPick.dispose());
		quickPick.show();

		const choice = await new Promise<vscode.QuickPickItem | undefined>(resolve => {
			quickPick.onDidAccept(() => resolve(quickPick.selectedItems[0]));
		});

		if (!choice) {
			vscode.window.showInformationMessage('No format selected');
			return;
		}

		let fallbackSelected = selectedText || documentText;
		fallbackSelected = fallbackSelected.trim();

		try {
			const formattedText = await CommandRunner.run({
				command: choice.label,
				selectedText,
				documentText,
				selectionIsEmpty: editor.selection.isEmpty,
				fallbackSelected,
			});

			let language = commands.find(c => c.label === choice?.label)?.outputLanguage ?? 'plaintext';

			let doc = await vscode.workspace.openTextDocument({
				content: formattedText,
				language,
			});

			await vscode.window.showTextDocument(doc, {
				preview: true,
				viewColumn: vscode.ViewColumn.Two,
			});
		} catch (e) {
			console.error(e);
			vscode.window.showErrorMessage('Incorrect type');
			return;
		}
	});

	context.subscriptions.push(commandRegistration);
}

export function deactivate() { }
