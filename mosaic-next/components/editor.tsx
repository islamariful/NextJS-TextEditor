// components/Editor.tsx
'use client';

import { FC, useEffect, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface EditorProps {
  initialContent: string;
  onChange: (content: string) => void;
}

const Editor: FC<EditorProps> = ({ initialContent, onChange }) => {
  const [content, setContent] = useState(initialContent);

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      setContent(newContent);
      onChange(newContent);
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content]);

  return <EditorContent editor={editor} />;
};

export default Editor;
