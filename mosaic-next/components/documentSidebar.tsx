// components/documentSidebar.tsx
'use client';

import { FC, useEffect, useRef, useState } from 'react';

interface SidebarProps {
  documents: { id: string; title: string }[];
  onNewDocument: () => void;
  onSelectDocument: (id: string) => void;
  onDeleteDocument: (id: string) => void;
}

const DocumentSidebar: FC<SidebarProps> = ({ documents, onNewDocument, onSelectDocument, onDeleteDocument }) => {
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = (id: string) => {
    if (showDropdown === id) {
      setShowDropdown(null);
    } else {
      setShowDropdown(id);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-1/4 bg-gray-800 text-gray-100 p-4 shadow-lg border-r border-gray-700 relative">
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
            className="flex items-center justify-between mb-2 p-2 rounded hover:bg-gray-700 cursor-pointer relative"
            onClick={() => onSelectDocument(doc.id)}
          >
            <span>{doc.title}</span>
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                toggleDropdown(doc.id);
              }} 
              className="ml-2"
            >
              ⋮
            </button>
            {showDropdown === doc.id && (
              <div ref={dropdownRef} className="absolute right-0 mt-16 bg-gray-700 text-white rounded shadow-md z-10">
                <button 
                  onClick={() => onDeleteDocument(doc.id)} 
                  className="block px-4 py-2 text-red-500 hover:bg-gray-600 w-full text-left"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentSidebar;
