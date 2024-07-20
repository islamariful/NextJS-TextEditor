'use client';

import { FC } from 'react';

interface SidebarProps {
  documents: { id: string; title: string }[];
  onNewDocument: () => void;
  onSelectDocument: (id: string) => void;
}

const DocumentSidebar: FC<SidebarProps> = ({ documents, onNewDocument, onSelectDocument }) => {
  return (
    <div className="w-1/4 bg-gray-800 text-gray-100 p-4 shadow-lg">
      <button 
        onClick={onNewDocument} 
        className="w-full bg-blue-500 text-white py-2 mb-4 rounded-lg"
      >
        New Document
      </button>
      <ul>
        {documents.map(doc => (
          <li 
            key={doc.id} 
            onClick={() => onSelectDocument(doc.id)} 
            className="cursor-pointer mb-2 hover:bg-gray-700 p-2 rounded"
          >
            {doc.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentSidebar;
