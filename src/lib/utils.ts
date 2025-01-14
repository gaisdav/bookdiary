import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { createEditor } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';

/**
 * Tailwind CSS classnames
 * @param inputs
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert JSON to HTML
 * @param json
 */
export const convertJSONToHTML = (json: string): string => {
  if (!json) return '';

  const editor = createEditor();
  editor.setEditorState(editor.parseEditorState(json));
  let htmlContent = '';
  editor.update(() => {
    htmlContent = $generateHtmlFromNodes(editor);
  });
  return htmlContent;
};
