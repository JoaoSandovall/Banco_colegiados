import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';

interface RepresentantesFilterSectionProps {
  filters: {
    nomeColegiado: string;
    status: string;
    nomeRepresentante: string;
    tipoRepresentacao: string;
    cceFce: string;
    cargo: string;
    secretaria: string;
    departamento: string;
    atoIndicacao: string;
    dataAtoIndicacao: string;
    numeroProcesso: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
  opcoesRepresentantes?: string[]; 
  opcoesColegiados?: string[]; 
  opcoesSecretarias?: string[];
  opcoesDepartamentos?: string[];
}

export function RepresentantesFilterSection({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  onApplyFilters,
  opcoesRepresentantes = [],
  opcoesColegiados = [],
  opcoesSecretarias = [],
  opcoesDepartamentos = []
}: RepresentantesFilterSectionProps) {
  return (
    <div className="bg-[#f9fafb] p-4 md:p-6 rounded-lg border border-border">
      <h3 className="mb-6 text-[#1a1a1a]">Filtros</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
        
        {/* Nome do Colegiado */}
        <div className="space-y-2">
          <Label htmlFor="nome-colegiado" className="text-[#4b5563]">Nome do Colegiado</Label>
          <Input
            id="nome-colegiado"
            list="lista-colegiados"
            value={filters.nomeColegiado}
            onChange={(e) => onFilterChange('nomeColegiado', e.target.value)}
            className="bg-white border-[#d1d5db] h-10"
            placeholder="Digite o colegiado"
          />
          <datalist id="lista-colegiados">
            {opcoesColegiados.map((nome, index) => <option key={index} value={nome} />)}
          </datalist>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status" className="text-[#4b5563]">Status</Label>
          <Select value={filters.status} onValueChange={(value: string) => onFilterChange('status', value)}>
            <SelectTrigger id="status" className="bg-white border-[#d1d5db] h-10">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
              <SelectItem value="exonerado">Exonerado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Nome do Representante */}
        <div className="space-y-2">
          <Label htmlFor="nome-representante" className="text-[#4b5563]">Nome do Representante</Label>
          <Input
            id="nome-representante"
            list="lista-representantes"
            value={filters.nomeRepresentante}
            onChange={(e) => onFilterChange('nomeRepresentante', e.target.value)}
            className="bg-white border-[#d1d5db] h-10"
            placeholder="Digite o nome"
          />
          <datalist id="lista-representantes">
            {opcoesRepresentantes.map((nome, index) => <option key={index} value={nome} />)}
          </datalist>
        </div>

        {/* Tipo Representação */}
        <div className="space-y-2">
          <Label htmlFor="tipo-representacao" className="text-[#4b5563]">Tipo de Representação</Label>
          <Select value={filters.tipoRepresentacao} onValueChange={(value: string) => onFilterChange('tipoRepresentacao', value)}>
            <SelectTrigger id="tipo-representacao" className="bg-white border-[#d1d5db] h-10">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="titular">Titular</SelectItem>
              <SelectItem value="suplente">Suplente</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* CCE/FCE */}
        <div className="space-y-2">
          <Label htmlFor="cce-fce" className="text-[#4b5563]">CCE/FCE Representante</Label>
          <Input
            id="cce-fce"
            value={filters.cceFce}
            onChange={(e) => onFilterChange('cceFce', e.target.value)}
            className="bg-white border-[#d1d5db] h-10"
            placeholder="Ex: CCE 1.13"
          />
        </div>

        {/* Cargo */}
        <div className="space-y-2">
          <Label htmlFor="cargo" className="text-[#4b5563]">Cargo Representante</Label>
          <Input
            id="cargo"
            value={filters.cargo}
            onChange={(e) => onFilterChange('cargo', e.target.value)}
            className="bg-white border-[#d1d5db] h-10"
            placeholder="Digite o cargo"
          />
        </div>

        {/* Secretaria */}
        <div className="space-y-2">
          <Label htmlFor="secretaria" className="text-[#4b5563]">Secretaria Representante</Label>
          <Input
            id="secretaria"
            list="lista-secretarias"
            value={filters.secretaria}
            onChange={(e) => onFilterChange('secretaria', e.target.value)}
            className="bg-white border-[#d1d5db] h-10"
            placeholder="Digite a secretaria"
          />
          <datalist id="lista-secretarias">
            {opcoesSecretarias.map((sec, index) => <option key={index} value={sec} />)}
          </datalist>
        </div>

        {/* Departamento */}
        <div className="space-y-2">
          <Label htmlFor="departamento" className="text-[#4b5563]">Departamento Representante</Label>
          <Input
            id="departamento"
            list="lista-departamentos"
            value={filters.departamento}
            onChange={(e) => onFilterChange('departamento', e.target.value)}
            className="bg-white border-[#d1d5db] h-10"
            placeholder="Digite o departamento"
          />
          <datalist id="lista-departamentos">
            {opcoesDepartamentos.map((dep, index) => <option key={index} value={dep} />)}
          </datalist>
        </div>

        {/* Ato Indicação */}
        <div className="space-y-2">
          <Label htmlFor="ato-indicacao" className="text-[#4b5563]">Ato Indicação Representante</Label>
          <Input
            id="ato-indicacao"
            value={filters.atoIndicacao}
            onChange={(e) => onFilterChange('atoIndicacao', e.target.value)}
            className="bg-white border-[#d1d5db] h-10"
            placeholder="Nº Portaria/Ato"
          />
        </div>

        {/* Data Ato Indicação */}
        <div className="space-y-2">
          <Label htmlFor="data-ato" className="text-[#4b5563]">Data Ato Indicação Representante</Label>
          <Input
            id="data-ato"
            type="date"
            value={filters.dataAtoIndicacao}
            onChange={(e) => onFilterChange('dataAtoIndicacao', e.target.value)}
            className="bg-white border-[#d1d5db] h-10"
          />
        </div>

        {/* Nº Processo */}
        <div className="space-y-2">
          <Label htmlFor="numero-processo" className="text-[#4b5563]">Nº do Processo</Label>
          <Input
            id="numero-processo"
            value={filters.numeroProcesso}
            onChange={(e) => onFilterChange('numeroProcesso', e.target.value)}
            className="bg-white border-[#d1d5db] h-10"
            placeholder="Ex: 59000.000000/0000-00"
          />
        </div>

      </div>

      {/* Filter Actions */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-4 border-t border-gray-200">
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