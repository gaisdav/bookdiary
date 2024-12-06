export interface TEditorProps {
  JSONValue?: string;
  onChange: (editorStateJSON: string, valueText?: string) => void;
}
