// app/(default)/editor/page.tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import DocumentSidebar from '@/components/documentSidebar';

// Dynamically import the Tiptap editor component
const EditorComponent = dynamic(() => import('@/components/editor'), { ssr: false });

const EditorPage = () => {
  const [documents, setDocuments] = useState<{ id: string; title: string; content: string }[]>([
    { id: '1', title: 'Document 1', content: '<p>Initial content for Document 1</p>' },
    { id: '2', title: 'Document 2', content: '<p>Initial content for Document 2</p>' },
    { id: '3', title: 'Document 3', content: '<p>Initial content for Document 3</p>' },
  ]);
  const [selectedDocument, setSelectedDocument] = useState(documents[0]);

  const handleNewDocument = () => {
    const newDoc = { id: `${documents.length + 1}`, title: `Document ${documents.length + 1}`, content: '<p>New Document</p>' };
    setDocuments([...documents, newDoc]);
    setSelectedDocument(newDoc);
  };

  const handleSelectDocument = (id: string) => {
    const doc = documents.find(d => d.id === id);
    if (doc) {
      setSelectedDocument(doc);
    }
  };

  const handleContentChange = (newContent: string) => {
    setSelectedDocument({ ...selectedDocument, content: newContent });
    setDocuments(documents.map(doc => (doc.id === selectedDocument.id ? { ...doc, content: newContent } : doc)));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setSelectedDocument({ ...selectedDocument, title: newTitle });
    setDocuments(documents.map(doc => (doc.id === selectedDocument.id ? { ...doc, title: newTitle } : doc)));
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <DocumentSidebar 
        documents={documents} 
        onNewDocument={handleNewDocument} 
        onSelectDocument={handleSelectDocument} 
      />
      <div className="w-3/4 p-4 bg-gray-800 shadow-lg flex flex-col">
        <div className="flex flex-col mb-4">
          <input
            type="text"
            value={selectedDocument.title}
            onChange={handleTitleChange}
            className="bg-transparent text-2xl mb-2 border-b border-gray-700 focus:outline-none"
          />
        </div>
        <EditorComponent initialContent={selectedDocument.content} onChange={handleContentChange} />
      </div>
    </div>
  );
};

export default EditorPage;
