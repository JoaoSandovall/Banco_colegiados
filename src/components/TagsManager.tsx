import { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { X, Plus, Tag } from 'lucide-react';
import { Label } from './ui/label';

export interface TagItem {
  id: string;
  text: string;
  color: string;
}

interface TagsManagerProps {
  tags: TagItem[];
  onTagsChange: (tags: TagItem[]) => void;
}

const TAG_COLORS = [
  { name: 'Vermelho', value: 'red', bg: 'bg-[#dc2626]', hover: 'hover:bg-[#b91c1c]', border: 'border-[#dc2626]' },
  { name: 'Azul', value: 'blue', bg: 'bg-[#2563eb]', hover: 'hover:bg-[#1d4ed8]', border: 'border-[#2563eb]' },
  { name: 'Verde', value: 'green', bg: 'bg-[#16a34a]', hover: 'hover:bg-[#15803d]', border: 'border-[#16a34a]' },
  { name: 'Amarelo', value: 'yellow', bg: 'bg-[#eab308]', hover: 'hover:bg-[#ca8a04]', border: 'border-[#eab308]' },
  { name: 'Roxo', value: 'purple', bg: 'bg-[#9333ea]', hover: 'hover:bg-[#7e22ce]', border: 'border-[#9333ea]' },
  { name: 'Laranja', value: 'orange', bg: 'bg-[#ea580c]', hover: 'hover:bg-[#c2410c]', border: 'border-[#ea580c]' },
  { name: 'Rosa', value: 'pink', bg: 'bg-[#ec4899]', hover: 'hover:bg-[#db2777]', border: 'border-[#ec4899]' },
  { name: 'Cinza', value: 'gray', bg: 'bg-[#6b7280]', hover: 'hover:bg-[#4b5563]', border: 'border-[#6b7280]' },
];

export function TagsManager({ tags, onTagsChange }: TagsManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newTagText, setNewTagText] = useState('');
  const [selectedColor, setSelectedColor] = useState('blue');

  const handleAddTag = () => {
    const trimmedText = newTagText.trim();
    if (trimmedText) {
      const newTag: TagItem = {
        id: Date.now().toString(),
        text: trimmedText,
        color: selectedColor,
      };
      onTagsChange([...tags, newTag]);
      setNewTagText('');
      setSelectedColor('blue');
    }
  };

  const handleRemoveTag = (tagId: string) => {
    onTagsChange(tags.filter(tag => tag.id !== tagId));
  };

  const getColorClasses = (colorValue: string) => {
    return TAG_COLORS.find(c => c.value === colorValue) || TAG_COLORS[1];
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div>
          <Button
            variant="outline"
            size="sm"
            className="border-[#d1d5db] text-[#1a1a1a] hover:bg-[#f3f4f6] hover:text-[#003366] h-8"
          >
            <Tag size={14} className="mr-2" />
            {tags.length > 0 ? `${tags.length}` : 'Etiqueta'}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-96" align="end">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-[#1a1a1a] mb-3">Adicionar Etiqueta</h4>
            
            {/* Color Selection */}
            <div className="space-y-2 mb-4">
              <Label className="text-xs text-[#4b5563]">Escolher Cor:</Label>
              <div className="grid grid-cols-4 gap-2">
                {TAG_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`h-10 rounded ${color.bg} ${color.hover} transition-all ${
                      selectedColor === color.value 
                        ? 'ring-2 ring-offset-2 ring-[#003366]' 
                        : ''
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Text Input */}
            <div className="space-y-2 mb-4">
              <Label htmlFor="tag-text" className="text-xs text-[#4b5563]">
                Texto da Etiqueta (comentário/aviso):
              </Label>
              <div className="flex gap-2">
                <Input
                  id="tag-text"
                  value={newTagText}
                  onChange={(e) => setNewTagText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Ex: Urgente, Revisar, Pendente..."
                  className="h-9 text-sm flex-1"
                />
                <Button
                  onClick={handleAddTag}
                  size="sm"
                  className="bg-[#003366] hover:bg-[#004080] text-white h-9 px-3"
                >
                  <Plus size={14} />
                </Button>
              </div>
            </div>

            {/* Current Tags */}
            {tags.length > 0 && (
              <div>
                <Label className="text-xs text-[#4b5563] mb-2 block">Etiquetas Atuais:</Label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {tags.map((tag) => {
                    const colorClasses = getColorClasses(tag.color);
                    return (
                      <Badge 
                        key={tag.id}
                        className={`${colorClasses.bg} text-white px-2 py-1 text-xs border-0`}
                      >
                        {tag.text}
                        <button
                          onClick={() => handleRemoveTag(tag.id)}
                          className="ml-1.5 hover:text-[#1a1a1a]"
                        >
                          <X size={12} />
                        </button>
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}