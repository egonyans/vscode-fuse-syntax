/// <reference path="../../node_modules/vscode/typings/index.d.ts" />
import {
  CancellationToken,
  DocumentHighlight,
  DocumentHighlightProvider,
  Position,
  Range,
  TextDocument,
} from 'vscode';

import { event } from './client';

export class HighlightProvider implements DocumentHighlightProvider {

  provideDocumentHighlights(document: TextDocument, position: Position, token: CancellationToken): DocumentHighlight[] | Thenable<DocumentHighlight[]> {

    if (!document.isDirty) {
      event({
        "Name": "Fuse.Preview.SelectionChanged",
        "Data":
        {
          "Path": document.fileName, // Path to the file where selection was changed
          "Text": document.getText(), // Full source of document
          "CaretPosition": { "Line": 1 + position.line, "Character": 1 + position.character }
        }
      })
    }


    return Promise.reject();
  };

}