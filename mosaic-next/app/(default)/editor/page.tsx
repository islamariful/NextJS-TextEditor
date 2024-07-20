'use client'

import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamically import the Tiptap editor component
const EditorComponent = dynamic(() => import('@/components/editor'), { ssr: false });

export default function Editor() {
  const [content, setContent] = useState("<p>Type something here...</p>");

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Document Editor</h1>
        </div>
      </div>

      {/* Editor */}
      <div className="editor-container">
        <EditorComponent initialContent={content} onChange={handleContentChange} />
      </div>
    </div>
  );
}
