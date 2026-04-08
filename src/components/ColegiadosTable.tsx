import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Edit, Users, Heart } from 'lucide-react';
import { TagsManager, TagItem } from './TagsManager';

interface Colegiado {
  id: number;
  nome_colegiado: string;
  status_vigencia: 'Ativo' | 'Inativo' | 'Em estruturação';
  numeroRepresentantes: number;
  destacado?: boolean;
  tags?: TagItem[];
}

interface ColegiadosTableProps {
  colegiados: Colegiado[];
  onEdit: (id: number) => void;
  onViewRepresentantes: (id: number) => void;
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

export function ColegiadosTable({ colegiados, onEdit, onViewRepresentantes, onTagsChange }: ColegiadosTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo':
        return 'bg-[#dcfce7] text-[#166534] border-[#86efac]';
      case 'Em estruturação':
        return 'bg-[#fef3c7] text-[#92400e] border-[#fcd34d]';
      case 'Inativo':
        return 'bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]';
      default:
        return 'bg-[#e5e7eb] text-[#1a1a1a] border-[#d1d5db]';
    }
  };

  const getColorClasses = (colorValue: string) => {
    return TAG_COLORS.find(c => c.value === colorValue)?.bg || 'bg-[#2563eb]';
  };

  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#f9fafb] hover:bg-[#f9fafb]">
              <TableHead className="font-semibold text-[#003366] py-4 px-4 md:px-6 min-w-[250px]">
                Colegiado
              </TableHead>
              <TableHead className="font-semibold text-[#003366] py-4 px-4 md:px-6 w-[180px]">
                Status
              </TableHead>
              <TableHead className="font-semibold text-[#003366] py-4 px-4 md:px-6 text-right w-[200px]">
                Número de Representantes
              </TableHead>
              <TableHead className="font-semibold text-[#003366] py-4 px-4 md:px-6 w-[200px]">
                Etiquetas
              </TableHead>
              <TableHead className="w-[300px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {colegiados.map((colegiado) => (
              <TableRow 
                key={colegiado.id}
                className="hover:bg-[#f9fafb] transition-colors"
              >
                <TableCell className="py-4 px-4 md:px-6">
                  <div className="flex items-center gap-2">
                    <span className="text-[#1a1a1a]">{colegiado.nome_colegiado}</span>
                    {colegiado.destacado && (
                      <Heart size={16} className="text-[#dc2626] fill-[#dc2626] flex-shrink-0" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-4 px-4 md:px-6">
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(colegiado.status_vigencia)} border font-normal px-3 py-1 whitespace-nowrap`}
                  >
                    {colegiado.status_vigencia}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 px-4 md:px-6 text-right text-[#1a1a1a]">
                  {colegiado.numeroRepresentantes}
                </TableCell>
                <TableCell className="py-4 px-4 md:px-6">
                  <div className="flex items-center gap-2">
                    {colegiado.tags && colegiado.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mr-2">
                        {colegiado.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag.id}
                            className={`${getColorClasses(tag.color)} text-white px-2 py-0.5 text-xs border-0`}
                            title={tag.text}
                          >
                            {tag.text.length > 15 ? tag.text.substring(0, 15) + '...' : tag.text}
                          </Badge>
                        ))}
                        {colegiado.tags.length > 3 && (
                          <Badge
                            variant="secondary"
                            className="bg-[#6b7280] text-white px-2 py-0.5 text-xs"
                          >
                            +{colegiado.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                    <TagsManager
                      tags={colegiado.tags || []}
                      onTagsChange={(tags) => onTagsChange(colegiado.id, tags)}
                    />
                  </div>
                </TableCell>
                <TableCell className="py-4 px-4 md:px-6">
                  <div className="flex items-center gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(colegiado.id)}
                      className="border-[#d1d5db] text-[#1a1a1a] hover:bg-[#f3f4f6] hover:text-[#003366] whitespace-nowrap"
                    >
                      <Edit size={14} className="mr-2" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewRepresentantes(colegiado.id)}
                      className="border-[#d1d5db] text-[#1a1a1a] hover:bg-[#f3f4f6] hover:text-[#003366] whitespace-nowrap"
                    >
                      <Users size={14} className="mr-2" />
                      Visualizar Representantes
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}