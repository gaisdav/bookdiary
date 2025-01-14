export interface TEditorProps {
  onChange: (editorStateJSON: string, valueText?: string) => void;
  autoFocus?: boolean;
  containerClassName?: string;
}
