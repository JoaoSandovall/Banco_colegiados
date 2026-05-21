import { Label } from './ui/label';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MultiSelect } from './MultiSelect';

export interface FilterSectionProps {
  filters: {
    nomeColegiado: string[];
    coordenacao: string[];
    temas: string[];
    status: string[];
    principalSub: string[];
    atuacaoMIDR: string[];
    internoMinisterial: string[];
    filtroEtiquetas: string;
  };
  onFilterChange: (key: string, value: any) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
  opcoesNomes?: string[];
  opcoesCoordenacoes?: string[];
  opcoesTemas?: string[];
  opcoesStatus?: string[];
  opcoesPrincipalSub?: string[];
  opcoesAtuacao?: string[];
  opcoesInternoMin?: string[];
}

export function FilterSection({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  onApplyFilters,
  opcoesNomes = [],
  opcoesCoordenacoes = [],
  opcoesTemas = [],
  opcoesStatus = [],
  opcoesPrincipalSub = [],
  opcoesAtuacao = [],
  opcoesInternoMin = []
}: FilterSectionProps) {
  return (
    <div className="bg-[#f9fafb] p-4 md:p-6 rounded-lg border border-border">
      <h3 className="mb-6 text-[#1a1a1a] font-bold">Filtros Avançados (Múltipla Escolha)</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
        <div className="space-y-2">
          <Label className="text-[#4b5563]">Nome do Colegiado</Label>
          <MultiSelect options={opcoesNomes} selected={filters.nomeColegiado} onChange={(v) => onFilterChange('nomeColegiado', v)} />
        </div>
        <div className="space-y-2">
          <Label className="text-[#4b5563]">Coordenação</Label>
          <MultiSelect options={opcoesCoordenacoes} selected={filters.coordenacao} onChange={(v) => onFilterChange('coordenacao', v)} />
        </div>
        <div className="space-y-2">
          <Label className="text-[#4b5563]">Temas</Label>
          <MultiSelect options={opcoesTemas} selected={filters.temas} onChange={(v) => onFilterChange('temas', v)} />
        </div>
        <div className="space-y-2">
          <Label className="text-[#4b5563]">Status (Vigência)</Label>
          <MultiSelect options={opcoesStatus} selected={filters.status} onChange={(v) => onFilterChange('status', v)} />
        </div>
        <div className="space-y-2">
          <Label className="text-[#4b5563]">Principal/Subcolegiado</Label>
          <MultiSelect options={opcoesPrincipalSub} selected={filters.principalSub} onChange={(v) => onFilterChange('principalSub', v)} />
        </div>
        <div className="space-y-2">
          <Label className="text-[#4b5563]">Atuação do MIDR</Label>
          <MultiSelect options={opcoesAtuacao} selected={filters.atuacaoMIDR} onChange={(v) => onFilterChange('atuacaoMIDR', v)} />
        </div>
        <div className="space-y-2">
          <Label className="text-[#4b5563]">Interno/Interministerial</Label>
          <MultiSelect options={opcoesInternoMin} selected={filters.internoMinisterial} onChange={(v) => onFilterChange('internoMinisterial', v)} />
        </div>
        <div className="space-y-2 lg:col-span-2">
          <Label className="text-[#4b5563]">Filtrar por Etiquetas (Pesquisa de texto livre)</Label>
          <Input value={filters.filtroEtiquetas} onChange={(e) => onFilterChange('filtroEtiquetas', e.target.value)} className="bg-white border-[#d1d5db] h-10" placeholder="Ex: Urgente, Revisar..." />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-4 border-t border-gray-200">
        <Button variant="outline" onClick={onClearFilters} className="border-[#d1d5db] text-[#6b7280] hover:bg-[#f3f4f6]">Descartar Filtros</Button>
        <Button onClick={onApplyFilters} className="bg-[#003366] hover:bg-[#004080] text-white">Aplicar Filtros</Button>
      </div>
    </div>
  );
}