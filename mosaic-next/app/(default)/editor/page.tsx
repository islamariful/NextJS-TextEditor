'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import DocumentSidebar from '@/components/documentSidebar';
import ReplayHistory from '@/components/ReplayHistory';

interface Document {
  id: string;
  title: string;
  content: string;
  history: { content: string; timestamp: Date }[];
}

// Dynamically import the editor component
const EditorComponent = dynamic(() => import('@/components/editor'), { ssr: false });

const EditorPage = () => {
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', title: 'Document 1', content: '<p>Initial content for Document 1</p>', history: [] },
    { id: '2', title: 'Document 2', content: '<p>Initial content for Document 2</p>', history: [] },
    { id: '3', title: 'Document 3', content: '<p>Initial content for Document 3</p>', history: [] },
  ]);
  const [selectedDocument, setSelectedDocument] = useState(documents[0]);
  const [editorContent, setEditorContent] = useState(selectedDocument.content);
  const [replayMode, setReplayMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setEditorContent(selectedDocument.content);
    setReplayMode(false);
    setIsPlaying(false);
  }, [selectedDocument]);

  const handleNewDocument = () => {
    const newDoc = { id: `${documents.length + 1}`, title: `Document ${documents.length + 1}`, content: '<p>New Document</p>', history: [] };
    setDocuments([...documents, newDoc]);
    setSelectedDocument(newDoc);
  };

  const handleSelectDocument = (id: string) => {
    const doc = documents.find(d => d.id === id);
    if (doc) {
      setSelectedDocument(doc);
    }
  };

  const handleDeleteDocument = (id: string) => {
    const updatedDocuments = documents.filter(doc => doc.id !== id);
    setDocuments(updatedDocuments);
    if (selectedDocument.id === id && updatedDocuments.length > 0) {
      setSelectedDocument(updatedDocuments[0]);
    } else if (updatedDocuments.length === 0) {
      setSelectedDocument({ id: '', title: '', content: '', history: [] });
    }
  };

  const handleContentChange = (newContent: string) => {
    if (!replayMode) {
      setSelectedDocument({ ...selectedDocument, content: newContent });
      setDocuments(documents.map(doc => (doc.id === selectedDocument.id ? { ...doc, content: newContent } : doc)));
    }
  };

  const handleHistorySave = (newHistory: { content: string; timestamp: Date }[]) => {
    const updatedHistory = [...selectedDocument.history, ...newHistory];
    setSelectedDocument({ ...selectedDocument, history: updatedHistory });
    setDocuments(documents.map(doc => (doc.id === selectedDocument.id ? { ...doc, history: updatedHistory } : doc)));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setSelectedDocument({ ...selectedDocument, title: newTitle });
    setDocuments(documents.map(doc => (doc.id === selectedDocument.id ? { ...doc, title: newTitle } : doc)));
  };

  const handleReplayHistory = () => {
    console.log("doc: ", selectedDocument.id);
    setReplayMode(true);
    setIsPlaying(true);
  };

  const handleSliderChange = (index: number) => {
    if (selectedDocument.history[index]) {
      setEditorContent(selectedDocument.history[index].content);
    }
  };

  const handleDismissReplay = () => {
    setReplayMode(false);
    setIsPlaying(false);
  };

  const handlePausePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <DocumentSidebar
        documents={documents}
        selectedDocumentId={selectedDocument.id}
        onNewDocument={handleNewDocument}
        onSelectDocument={handleSelectDocument}
        onDeleteDocument={handleDeleteDocument}
        onReplayHistory={handleReplayHistory}
      />
      <div className="w-3/4 p-4 bg-gray-800 shadow-lg flex flex-col border-l border-gray-700 h-full">
        <div className="flex flex-col mb-4">
          <input
            type="text"
            value={selectedDocument.title}
            onChange={handleTitleChange}
            className="bg-transparent text-2xl mb-2 border-b border-gray-700 focus:outline-none"
          />
        </div>
        {!replayMode && (
          <EditorComponent initialContent={editorContent} onChange={handleContentChange} onSaveHistory={handleHistorySave} />
        )}
        {replayMode && (
          <ReplayHistory
            history={selectedDocument.history}
            onSliderChange={handleSliderChange}
            onDismiss={handleDismissReplay}
            onPausePlay={handlePausePlay}
            isPlaying={isPlaying}
          />
        )}
      </div>
    </div>
  );
};

export default EditorPage;
