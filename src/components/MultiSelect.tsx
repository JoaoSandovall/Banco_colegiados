import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import { Badge } from './ui/badge';

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

export function MultiSelect({ options = [], selected = [], onChange, placeholder = "Selecione..." }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const safeSelected = Array.isArray(selected) ? selected : [];
  const safeOptions = Array.isArray(options) ? options : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (safeSelected.includes(option)) {
      onChange(safeSelected.filter(item => item !== option));
    } else {
      onChange([...safeSelected, option]);
    }
  };

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  const filteredOptions = safeOptions.filter(opt => 
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full text-left" ref={containerRef}>
      
      <div 
        className="flex items-center justify-between w-full min-h-10 px-3 py-2 bg-white border border-[#d1d5db] rounded-md cursor-pointer hover:bg-gray-50 transition-colors shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1 items-center max-w-[85%]">
          {safeSelected.length === 0 && <span className="text-gray-500 text-[15px] truncate">{placeholder}</span>}
          
          {safeSelected.length > 0 && safeSelected.length <= 2 && safeSelected.map(item => (
            <Badge key={item} variant="secondary" className="bg-[#e5e7eb] text-[#1a1a1a] hover:bg-[#d1d5db] font-normal truncate max-w-[140px]">
              {item}
            </Badge>
          ))}
          
          {safeSelected.length > 2 && (
            <Badge variant="secondary" className="bg-[#003366] text-white hover:bg-[#002244] font-normal">
              {safeSelected.length} selecionados
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-1 shrink-0 text-gray-500">
          {safeSelected.length > 0 && (
            <div 
              className="p-1 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
              onClick={clearAll}
              title="Limpar seleção"
            >
              <X size={14} className="hover:text-red-500" />
            </div>
          )}
          <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
          
          <div className="p-2 border-b border-gray-100 bg-gray-50">
            <input
              type="text"
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#003366] focus:ring-1 focus:ring-[#003366]"
              placeholder="Pesquisar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          <div className="max-h-60 overflow-y-auto p-1 bg-white">
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-sm text-gray-500 text-center">Nenhuma opção disponível.</div>
            ) : (
              filteredOptions.map(option => (
                <div
                  key={option}
                  className="flex items-center px-2 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={(e) => toggleOption(option, e)}
                >
                  <div className={`mr-3 flex items-center justify-center w-4 h-4 border rounded transition-colors ${safeSelected.includes(option) ? 'bg-[#003366] border-[#003366]' : 'border-gray-300 bg-white'}`}>
                    {safeSelected.includes(option) && <Check size={12} className="text-white" strokeWidth={3} />}
                  </div>
                  <span className="truncate text-gray-700" title={option}>{option}</span>
                </div>
              ))
            )}
          </div>

        </div>
      )}
    </div>
  );
}