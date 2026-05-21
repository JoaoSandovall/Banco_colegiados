import { Label } from './ui/label';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MultiSelect } from './MultiSelect';

interface RepresentantesFilterSectionProps {
  filters: {
    nomeColegiado: string[];
    status: string[];
    nomeRepresentante: string[];
    tipoRepresentacao: string[];
    cceFce: string[];
    cargo: string[];
    secretaria: string[];
    departamento: string[];
    atoIndicacao: string[];
    dataAtoIndicacao: string[];
    numeroProcesso: string[];
    filtroEtiquetas: string;
  };
  onFilterChange: (key: string, value: any) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
  opcoesRepresentantes?: string[]; 
  opcoesColegiados?: string[]; 
  opcoesSecretarias?: string[];
  opcoesDepartamentos?: string[];
  opcoesCargos?: string[];
  opcoesCceFce?: string[];
  opcoesStatus?: string[];
  opcoesTiposRep?: string[];
  opcoesAtos?: string[];
  opcoesDatasAtos?: string[];
  opcoesProcessos?: string[];
}

export function RepresentantesFilterSection({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  onApplyFilters,
  opcoesRepresentantes = [],
  opcoesColegiados = [],
  opcoesSecretarias = [],
  opcoesDepartamentos = [],
  opcoesCargos = [],
  opcoesCceFce = [],
  opcoesStatus = [],
  opcoesTiposRep = [],
  opcoesAtos = [],
  opcoesDatasAtos = [],
  opcoesProcessos = []
}: RepresentantesFilterSectionProps) {
  return (
    <div className="bg-[#f9fafb] p-4 md:p-6 rounded-lg border border-border">
      <h3 className="mb-6 text-[#1a1a1a] font-bold">Filtros Avançados (Múltipla Escolha)</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
        <div className="space-y-2">
          <Label className="text-[#4b5563]">Nome do Colegiado</Label>
          <MultiSelect options={opcoesColegiados} selected={filters.nomeColegiado} onChange={(v) => onFilterChange('nomeColegiado', v)} />
        </div>
        <div className="space-y-2">
          <Label className="text-[#4b5563]">Status</Label>
          <MultiSelect options={opcoesStatus} selected={filters.status} onChange={(v) => onFilterChange('status', v)} />
        </div>
        <div className="space-y-2">
          <Label className="text-[#4b5563]">Nome do Representante</Label>
          <MultiSelect options={opcoesRepresentantes} selected={filters.nomeRepresentante} onChange={(v) => onFilterChange('nomeRepresentante', v)} />
        </div>
        <div className="space-y-2">
          <Label className="text-[#4b5563]">Tipo de Representação</Label>
          <MultiSelect options={opcoesTiposRep} selected={filters.tipoRepresentacao} onChange={(v) => onFilterChange('tipoRepresentacao', v)} />
        </div>
        <div className="space-y-2">
          <Label className="text-[#4b5563]">CCE/FCE</Label>
          <MultiSelect options={opcoesCceFce} selected={filters.cceFce} onChange={(v) => onFilterChange('cceFce', v)} />
        </div>
        <div className="space-y-2">
          <Label className="text-[#4b5563]">Cargo Representante</Label>
          <MultiSelect options={opcoesCargos} selected={filters.cargo} onChange={(v) => onFilterChange('cargo', v)} />
        </div>
        <div className="space-y-2">
          <Label className="text-[#4b5563]">Secretaria</Label>
          <MultiSelect options={opcoesSecretarias} selected={filters.secretaria} onChange={(v) => onFilterChange('secretaria', v)} />
        </div>
        <div className="space-y-2">
          <Label className="text-[#4b5563]">Departamento</Label>
          <MultiSelect options={opcoesDepartamentos} selected={filters.departamento} onChange={(v) => onFilterChange('departamento', v)} />
        </div>
        <div className="space-y-2">
          <Label className="text-[#4b5563]">Ato de Indicação</Label>
          <MultiSelect options={opcoesAtos} selected={filters.atoIndicacao} onChange={(v) => onFilterChange('atoIndicacao', v)} />
        </div>
        <div className="space-y-2">
          <Label className="text-[#4b5563]">Data Ato Indicação</Label>
          <MultiSelect options={opcoesDatasAtos} selected={filters.dataAtoIndicacao} onChange={(v) => onFilterChange('dataAtoIndicacao', v)} />
        </div>
        <div className="space-y-2">
          <Label className="text-[#4b5563]">Nº Processo</Label>
          <MultiSelect options={opcoesProcessos} selected={filters.numeroProcesso} onChange={(v) => onFilterChange('numeroProcesso', v)} />
        </div>
        <div className="space-y-2">
          <Label className="text-[#4b5563]">Filtrar por Etiquetas (texto)</Label>
          <Input value={filters.filtroEtiquetas} onChange={(e) => onFilterChange('filtroEtiquetas', e.target.value)} className="bg-white border-[#d1d5db] h-10" placeholder="Ex: Urgente..." />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-4 border-t border-gray-200">
        <Button variant="outline" onClick={onClearFilters} className="border-[#d1d5db] text-[#6b7280] hover:bg-[#f3f4f6]">Descartar Filtros</Button>
        <Button onClick={onApplyFilters} className="bg-[#003366] hover:bg-[#004080] text-white">Aplicar Filtros</Button>
      </div>
    </div>
  );
}