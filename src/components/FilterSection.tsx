import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { X } from 'lucide-react';

interface FilterSectionProps {
  filters: {
    nomeColegiado: string;
    coordenacao: string;
    temas: string;
    status: string;
    principalSub: string;
    atuacaoMIDR: string;
    internoMinisterial: string;
    filtroEtiquetas: string;
  };
  onFilterChange: (key: string, value: string | string[]) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
  tags: string[];
  onRemoveTag: (tag: string) => void;
}

export function FilterSection({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  onApplyFilters,
  tags,
  onRemoveTag
}: FilterSectionProps) {
  return (
    <div className="bg-[#f9fafb] p-4 md:p-6 rounded-lg border border-border">
      <h3 className="mb-6 text-[#1a1a1a]">Filtros</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <div className="space-y-2">
          <Label htmlFor="nome-colegiado" className="text-[#4b5563]">
            Nome do Colegiado
          </Label>
          <Input
            id="nome-colegiado"
            value={filters.nomeColegiado}
            onChange={(e) => onFilterChange('nomeColegiado', e.target.value)}
            className="bg-white border-[#d1d5db] h-10"
            placeholder="Digite o nome"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="coordenacao" className="text-[#4b5563]">
            Coordenação do Colegiado
          </Label>
          <Input
            id="coordenacao"
            value={filters.coordenacao}
            onChange={(e) => onFilterChange('coordenacao', e.target.value)}
            className="bg-white border-[#d1d5db] h-10"
            placeholder="Digite a coordenação"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="temas" className="text-[#4b5563]">
            Temas
          </Label>
          <Input
            id="temas"
            value={filters.temas}
            onChange={(e) => onFilterChange('temas', e.target.value)}
            className="bg-white border-[#d1d5db] h-10"
            placeholder="Digite os temas"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status" className="text-[#4b5563]">
            Status (Vigência)
          </Label>
          <Select value={filters.status} onValueChange={(value: string) => onFilterChange('status', value)}>
            <SelectTrigger id="status" className="bg-white border-[#d1d5db] h-10">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
              <SelectItem value="em-estruturacao">Em estruturação</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="principal-sub" className="text-[#4b5563]">
            Principal/Subcol
          </Label>
          <Select value={filters.principalSub} onValueChange={(value: string) => onFilterChange('principalSub', value)}>
            <SelectTrigger id="principal-sub" className="bg-white border-[#d1d5db] h-10">
              <SelectValue placeholder="Principal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="principal">Principal</SelectItem>
              <SelectItem value="subcolegiado">Subcolegiado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="atuacao-midr" className="text-[#4b5563]">
            Atuação do MIDR
          </Label>
          <Select value={filters.atuacaoMIDR} onValueChange={(value: string) => onFilterChange('atuacaoMIDR', value)}>
            <SelectTrigger id="atuacao-midr" className="bg-white border-[#d1d5db] h-10">
              <SelectValue placeholder="Atuação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="participante">Participante</SelectItem>
              <SelectItem value="coordenador">Coordenador</SelectItem>
              <SelectItem value="participante">Participante</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="interno-ministerial" className="text-[#4b5563]">
            Interno/ministerial
          </Label>
          <Select value={filters.internoMinisterial} onValueChange={(value: string) => onFilterChange('internoMinisterial', value)}>
            <SelectTrigger id="interno-ministerial" className="bg-white border-[#d1d5db] h-10">
              <SelectValue placeholder="Interministerial" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="interno">Interno</SelectItem>
              <SelectItem value="interministerial">Interministerial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="filtro-etiquetas" className="text-[#4b5563]">
            Filtrar por Etiquetas (texto)
          </Label>
          <Input
            id="filtro-etiquetas"
            value={filters.filtroEtiquetas}
            onChange={(e) => onFilterChange('filtroEtiquetas', e.target.value)}
            className="bg-white border-[#d1d5db] h-10"
            placeholder="Digite o texto da etiqueta (ex: Urgente, Revisar...)"
          />
        </div>
      </div>

      {tags.length > 0 && (
        <div className="mt-5">
          <Label className="text-[#4b5563] mb-2 block">Etiquetas:</Label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="bg-[#e5e7eb] text-[#1a1a1a] px-3 py-1 hover:bg-[#d1d5db]"
              >
                {tag}
                <button 
                  onClick={() => onRemoveTag(tag)}
                  className="ml-2 hover:text-[#dc2626]"
                >
                  <X size={14} />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
        <Button 
          variant="outline" 
          onClick={onClearFilters}
          className="border-[#d1d5db] text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#1a1a1a] w-full sm:w-auto"
        >
          Descartar Filtros
        </Button>
        <Button 
          onClick={onApplyFilters}
          className="bg-[#003366] hover:bg-[#004080] text-white w-full sm:w-auto"
        >
          Aplicar Filtros
        </Button>
      </div>
    </div>
  );
}