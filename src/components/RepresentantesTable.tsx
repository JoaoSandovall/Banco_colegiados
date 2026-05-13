import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Eye, Pencil } from 'lucide-react'; 
import { TagsManager, TagItem } from './TagsManager';

export interface Representante {
  id: number;
  nome: string;
  status?: string;
  tags?: TagItem[];
}

interface RepresentantesTableProps {
  representantes: Representante[];
  onViewRepresentacoes: (id: number) => void;
  onEditRepresentante: (id: number) => void; // Abre Detalhes/Edição
  onViewRepresentante: (id: number) => void; // NOVO: Abre Apenas Leitura
  onTagsChange: (id: number, tags: TagItem[]) => void;
}

const TAG_COLORS = [
  { value: 'red', bg: 'bg-[#dc2626]' },
  { value: 'blue', bg: 'bg-[#2563eb]' },
  { value: 'green', bg: 'bg-[#16a34a]' },
  { value: 'yellow', bg: 'bg-[#eab308]' },
  { value: 'purple', bg: 'bg-[#9333ea]' },
  { value: 'orange', bg: 'bg-[#ea580c]' },
  { value: 'pink', bg: 'bg-[#ec4899]' },
  { value: 'gray', bg: 'bg-[#6b7280]' },
];

export function RepresentantesTable({ 
  representantes, 
  onViewRepresentacoes, 
  onEditRepresentante, 
  onViewRepresentante, // NOVO
  onTagsChange 
}: RepresentantesTableProps) {
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'bg-[#dcfce7] text-[#166534] border-[#86efac]';
      case 'Inativo': return 'bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]';
      case 'Exonerado': return 'bg-[#f3f4f6] text-[#4b5563] border-[#d1d5db]'; 
      default: return 'bg-[#e5e7eb] text-[#1a1a1a] border-[#d1d5db]';
    }
  };

  const getColorClasses = (colorValue: string) => TAG_COLORS.find(c => c.value === colorValue)?.bg || 'bg-[#2563eb]';

  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#f9fafb] hover:bg-[#f9fafb]">
              <TableHead className="font-semibold text-[#003366] py-4 px-4 md:px-6 min-w-[200px]">Representantes</TableHead>
              <TableHead className="font-semibold text-[#003366] py-4 px-4 md:px-6 w-[180px]">Status</TableHead>
              <TableHead className="font-semibold text-[#003366] py-4 px-4 md:px-6 w-[200px]">Etiquetas</TableHead>
              <TableHead className="w-[420px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {representantes.map((representante) => {
              const statusDisplay = representante.status || 'Ativo';

              return (
                <TableRow key={representante.id} className="hover:bg-[#f9fafb] transition-colors">
                  
                  {/* Nome agora abre a Visualização (onViewRepresentante) */}
                  <TableCell className="py-4 px-4 md:px-6">
                    <button 
                      onClick={() => onViewRepresentante(representante.id)}
                      className="text-[#003366] hover:text-[#2563eb] hover:underline font-medium text-left transition-colors outline-none"
                    >
                      {representante.nome}
                    </button>
                  </TableCell>
                  
                  <TableCell className="py-4 px-4 md:px-6">
                    <Badge variant="outline" className={`${getStatusColor(statusDisplay)} border font-normal px-3 py-1 whitespace-nowrap`}>
                      {statusDisplay}
                    </Badge>
                  </TableCell>
                  
                  <TableCell className="py-4 px-4 md:px-6">
                    <div className="flex items-center gap-2">
                      {representante.tags && representante.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mr-2">
                          {representante.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag.id} className={`${getColorClasses(tag.color)} text-white px-2 py-0.5 text-xs border-0`} title={tag.text}>
                              {tag.text.length > 15 ? tag.text.substring(0, 15) + '...' : tag.text}
                            </Badge>
                          ))}
                          {representante.tags.length > 3 && (
                            <Badge variant="secondary" className="bg-[#6b7280] text-white px-2 py-0.5 text-xs">
                              +{representante.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                      <TagsManager tags={representante.tags || []} onTagsChange={(tags) => onTagsChange(representante.id, tags)} />
                    </div>
                  </TableCell>
                  
                  <TableCell className="py-4 px-4 md:px-6">
                    <div className="flex items-center gap-2 justify-end">
                      {/* Botão Detalhes continua abrindo a Edição (onEditRepresentante) */}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => onEditRepresentante(representante.id)} 
                        className="border-[#d1d5db] text-[#1a1a1a] hover:bg-[#f3f4f6] hover:text-[#003366] whitespace-nowrap"
                      >
                        <Pencil size={14} className="mr-2" /> Detalhes
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => onViewRepresentacoes(representante.id)} 
                        className="border-[#d1d5db] text-[#1a1a1a] hover:bg-[#f3f4f6] hover:text-[#003366] whitespace-nowrap"
                      >
                        <Eye size={14} className="mr-2" /> Vínculos
                      </Button>
                    </div>
                  </TableCell>

                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}