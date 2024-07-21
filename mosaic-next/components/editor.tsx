'use client';

import { FC, useEffect, useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Toolbar from './Toolbar';

interface EditorProps {
  initialContent: string;
  onChange: (content: string) => void;
  onSaveHistory: (history: { content: string; timestamp: Date }[]) => void;
}

const EditorComponent: FC<EditorProps> = ({ initialContent, onChange, onSaveHistory }) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const handleSave = () => {
    if (editor) {
      const content = editor.getHTML();
      const timestamp = new Date();
      onSaveHistory([{ content, timestamp }]);
    }
  };

  useEffect(() => {
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent]);

  return (
    <div className="flex flex-col flex-1 bg-gray-900 text-gray-100">
      <Toolbar editor={editor} onSave={handleSave} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default EditorComponent;
