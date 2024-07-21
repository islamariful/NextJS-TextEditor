'use client';

import { FC, useState, useEffect, useRef, useCallback } from 'react';

interface DocumentSidebarProps {
  documents: { id: string; title: string; content: string; history: { content: string; timestamp: Date }[] }[];
  selectedDocumentId: string;
  onNewDocument: () => void;
  onSelectDocument: (id: string) => void;
  onDeleteDocument: (id: string) => void;
  onReplayHistory: (id: string) => void;
}

const DocumentSidebar: FC<DocumentSidebarProps> = ({
  documents,
  selectedDocumentId,
  onNewDocument,
  onSelectDocument,
  onDeleteDocument,
  onReplayHistory
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const dropdownRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownOpen !== null &&
      dropdownRefs.current.get(dropdownOpen) &&
      !dropdownRefs.current.get(dropdownOpen)?.contains(event.target as Node)
    ) {
      setDropdownOpen(null);
    }
  }, [dropdownOpen]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleReplayHistory = (id: string) => {
    onReplayHistory(id);
    setDropdownOpen(null);
  };

  return (
    <div className="w-1/4 p-4 bg-gray-800 border-r border-gray-700">
      <button className="w-full mb-4 py-2 bg-blue-600 text-white rounded-lg" onClick={onNewDocument}>
        New Document
      </button>
      {documents.map(doc => (
        <div
          key={doc.id}
          className={`flex justify-between items-center mb-2 p-2 cursor-pointer ${selectedDocumentId === doc.id ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          onClick={() => onSelectDocument(doc.id)}
        >
          <span className="flex-1">
            {doc.title}
          </span>
          <div
            className="relative"
            ref={el => {
              if (el) {
                dropdownRefs.current.set(doc.id, el);
              } else {
                dropdownRefs.current.delete(doc.id);
              }
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => setDropdownOpen(dropdownOpen === doc.id ? null : doc.id)}
            >
              <span className="sr-only">Options</span>
              <span>...</span>
            </button>
            {dropdownOpen === doc.id && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-10">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-600"
                  onClick={() => onDeleteDocument(doc.id)}
                >
                  Delete
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600"
                  onClick={() => handleReplayHistory(doc.id)}
                >
                  Replay History
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentSidebar;
