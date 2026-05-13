import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';

export interface RepresentanteBase {
  id?: number;
  nome: string;
  secretaria: string;
  sigla_secretaria: string;
  departamento?: string;
  sigla_departamento?: string;
  cargo?: string;
  cce_fce?: string;
  status?: string;
}

interface EditRepresentanteBasicoModalProps {
  isOpen: boolean;
  onClose: () => void;
  representanteId?: number | null;
  onSave: (data: Omit<RepresentanteBase, 'id'>) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
  initialData?: RepresentanteBase | null; 
}

const SECRETARIAS_OPCOES_INICIAIS = [
  { nome: "Secretaria Nacional de Políticas de Desenvolvimento Regional e Territorial", sigla: "SDR" },
  { nome: "Ministro", sigla: "Ministro" },
  { nome: "Secretaria-Executiva", sigla: "SE" },
  { nome: "Secretaria Nacional de Segurança Hídrica", sigla: "SNSH" },
  { nome: "Secretaria Nacional de Proteção e Defesa Civil", sigla: "SEDEC" },
  { nome: "Gabinete do Ministro", sigla: "GM" },
  { nome: "Assessoria Especial de Comunicação Social", sigla: "AESCOM" },
  { nome: "Assessoria Especial de Controle Interno", sigla: "AECI" },
  { nome: "Consultoria Jurídica", sigla: "CONJUR" },
  { nome: "Corregedoria", sigla: "Correg" },
  { nome: "Ouvidoria", sigla: "OUV" },
  { nome: "Secretaria Nacional de Fundos e Instrumentos Financeiros", sigla: "SNFI" },
  { nome: "Agência Nacional de Águas e Saneamento Básico", sigla: "ANA" },
  { nome: "Assessoria de Participação Social e Diversidade", sigla: "APSD" },
  { nome: "Assessoria Especial de Assuntos Internacionais", sigla: "ASSIN" },
  { nome: "Superintendência do Desenvolvimento da Amazônia", sigla: "SUDAM" },
  { nome: "Superintendência do Desenvolvimento do Nordeste", sigla: "SUDENE" },
  { nome: "Superintendência do Desenvolvimento do Centro-Oeste", sigla: "SUDECO" },
  { nome: "Departamento Nacional de Obras Contra as Secas", sigla: "DNOCS" },
  { nome: "Companhia de Desenvolvimento dos Vales do São Francisco e do Parnaíba", sigla: "CODEVASF" },
  { nome: "Secretaria Especial do Programa de Parcerias de Investimentos da Casa Civil da Presidência da República", sigla: "SEPPI" },
  { nome: "Ministério do Planejamento e Orçamento", sigla: "MPO" },
  { nome: "Ministério da Fazenda", sigla: "MF" },
  { nome: "Secretaria de Reformas Econômicas", sigla: "SRE" },
  { nome: "Municípios do Estado de Goiás da Região Integrada de Desenvolvimento do Distrito Federal e Entorno - RIDE", sigla: "RIDE" },
  { nome: "SECRETARIA DE GOVERNANÇA FUNDIÁRIA, DESENVOLVIMENTO TERRITORIAL E SOCIOAMBIENTAL", sigla: "SFDT do MDA" },
  { nome: "Unidade de Tecnologia da Informação", sigla: "TI" },
  { nome: "MINISTÉRIO DA AGRICULTURA E PECUÁRIA", sigla: "MAPA" }
];

export function EditRepresentanteBasicoModal({
  isOpen,
  onClose,
  representanteId,
  onSave,
  onDelete,
  initialData
}: EditRepresentanteBasicoModalProps) {
  
  const [loading, setLoading] = useState(false);
  const [opcoesSecretaria, setOpcoesSecretaria] = useState(SECRETARIAS_OPCOES_INICIAIS);
  const [isNovaSecretariaModalOpen, setIsNovaSecretariaModalOpen] = useState(false);
  const [novaSecretaria, setNovaSecretaria] = useState({ nome: '', sigla: '' });

  const [formData, setFormData] = useState({
    nome: '', secretaria: '', sigla_secretaria: '', departamento: '', sigla_departamento: '', cargo: '', cce_fce: '', status: 'Ativo'
  });

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        nome: initialData.nome || '', 
        secretaria: initialData.secretaria || '', 
        sigla_secretaria: initialData.sigla_secretaria || '', 
        departamento: initialData.departamento || '', 
        sigla_departamento: initialData.sigla_departamento || '', 
        cargo: initialData.cargo || '', 
        cce_fce: initialData.cce_fce || '',
        status: initialData.status || 'Ativo'
      });
      
      if (initialData.secretaria && !opcoesSecretaria.find(s => s.nome === initialData.secretaria)) {
        setOpcoesSecretaria(prev => [...prev, { nome: initialData.secretaria, sigla: initialData.sigla_secretaria || '' }]);
      }
    } else if (isOpen) {
      setFormData({ nome: '', secretaria: '', sigla_secretaria: '', departamento: '', sigla_departamento: '', cargo: '', cce_fce: '', status: 'Ativo' });
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSecretariaChange = (nomeSelecionado: string) => {
    const secretariaEncontrada = opcoesSecretaria.find(s => s.nome === nomeSelecionado);
    if (secretariaEncontrada) {
      setFormData(prev => ({
        ...prev,
        secretaria: secretariaEncontrada.nome,
        sigla_secretaria: secretariaEncontrada.sigla
      }));
    }
  };

  const handleAdicionarNovaSecretaria = () => {
    if (!novaSecretaria.nome.trim() || !novaSecretaria.sigla.trim()) {
      toast.error('Preencha o nome e a sigla da nova secretaria.');
      return;
    }
    setOpcoesSecretaria(prev => [...prev, { nome: novaSecretaria.nome, sigla: novaSecretaria.sigla }]);
    setFormData(prev => ({
      ...prev,
      secretaria: novaSecretaria.nome,
      sigla_secretaria: novaSecretaria.sigla
    }));
    setNovaSecretaria({ nome: '', sigla: '' });
    setIsNovaSecretariaModalOpen(false);
    toast.success('Nova secretaria adicionada à lista!');
  };

  const handleSubmit = async () => {
    if (!formData.nome.trim() || !formData.secretaria.trim()) {
      toast.error('Preencha os campos obrigatórios (Nome e Secretaria).');
      return;
    }
    try {
      setLoading(true);
      await onSave(formData);
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Erro ao salvar o representante.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async () => {
    if (!representanteId || !onDelete) return;
    if (window.confirm(`Tem certeza que deseja excluir o representante "${formData.nome}"? Esta ação excluirá todos os vínculos dele com colegiados e não pode ser desfeita.`)) {
      try {
        setLoading(true);
        await onDelete(representanteId);
        onClose();
      } catch (error: any) {
        toast.error(error.message || 'Erro ao excluir.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent style={{ maxWidth: '650px', width: '95%' }} className="bg-white p-0 rounded-md border-0 shadow-xl">
          <DialogHeader className="px-6 py-5 border-b border-gray-200">
            <DialogTitle className="text-xl font-medium text-[#003366]">
              {representanteId ? 'Detalhes do Representante' : 'Cadastrar Novo Representante'}
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
            <div className="mb-6">
              <Label htmlFor="nome" className="block mb-2 text-[15px] font-semibold text-gray-800">Nome</Label>
              <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} className="w-full h-11 border border-gray-400 rounded-md px-3 focus-visible:ring-1 focus-visible:ring-[#003366]" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="status" className="block mb-2 text-[15px] font-semibold text-gray-800">Status</Label>
                <Select value={formData.status} onValueChange={(val: string) => handleSelectChange('status', val)}>
                  <SelectTrigger className="w-full bg-white h-11 border border-gray-400 rounded-md px-3">
                    <SelectValue placeholder="Selecione o status..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                    <SelectItem value="Exonerado">Exonerado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="cce_fce" className="block mb-2 text-[15px] font-semibold text-gray-800">CCE/FCE</Label>
                <Input id="cce_fce" name="cce_fce" value={formData.cce_fce} onChange={handleChange} className="w-full h-11 border border-gray-400 rounded-md px-3" />
              </div>
            </div>

            <div className="mb-6">
              <Label htmlFor="cargo" className="block mb-2 text-[15px] font-semibold text-gray-800">Cargo do Representante</Label>
              <Input id="cargo" name="cargo" value={formData.cargo} onChange={handleChange} className="w-full h-11 border border-gray-400 rounded-md px-3" />
            </div>

            <hr className="my-8 border-gray-200" />

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="secretaria" className="text-[15px] font-semibold text-gray-800">Secretaria</Label>
                <button type="button" onClick={() => setIsNovaSecretariaModalOpen(true)} className="flex items-center justify-center w-5 h-5 bg-[#22c55e] text-white rounded hover:bg-[#16a34a] transition-colors" title="Adicionar nova secretaria">
                  <Plus size={14} strokeWidth={3} />
                </button>
              </div>
              <Select value={formData.secretaria} onValueChange={handleSecretariaChange}>
                <SelectTrigger className="w-full bg-white h-11 border border-gray-400 rounded-md text-left px-3">
                  <SelectValue placeholder="Selecione a secretaria..." />
                </SelectTrigger>
                <SelectContent className="max-h-[250px] border border-gray-300">
                  {opcoesSecretaria.map((sec) => (
                    <SelectItem key={sec.nome} value={sec.nome} className="py-2">{sec.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mb-2">
              <Label htmlFor="departamento" className="block mb-2 text-[15px] font-semibold text-gray-800">Departamento do Representante</Label>
              <Select value={formData.departamento || ""} onValueChange={(val: string) => handleSelectChange('departamento', val)}>
                <SelectTrigger className="w-full bg-white h-11 border border-gray-400 rounded-md text-left px-3">
                  <SelectValue placeholder="Selecione o departamento..." />
                </SelectTrigger>
                <SelectContent className="border border-gray-300">
                  {formData.departamento && (
                      <SelectItem key={formData.departamento} value={formData.departamento} className="py-2">{formData.departamento}</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between rounded-b-md">
            <div className="flex-1">
              {representanteId && onDelete && (
                <Button 
                  type="button"
                  onClick={handleDeleteClick} 
                  disabled={loading}
                  style={{ backgroundColor: '#ef4444', color: '#ffffff' }}
                  className="border-0 h-10 flex items-center gap-2 shadow-sm hover:opacity-80 transition-opacity"
                >
                  <Trash2 size={16} /> Excluir Representante
                </Button>
              )}
            </div>

            {/* LADO DIREITO: Botões Cancelar e Salvar */}
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose} disabled={loading} className="h-10 border-gray-400">Cancelar</Button>
              <Button onClick={handleSubmit} className="bg-[#22c55e] text-white hover:bg-[#16a34a] h-10" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isNovaSecretariaModalOpen} onOpenChange={setIsNovaSecretariaModalOpen}>
        <DialogContent style={{ maxWidth: '400px', width: '95%' }} className="bg-white p-0 rounded-md border-0 shadow-lg">
          <DialogHeader className="px-6 py-5 border-b border-gray-200">
            <DialogTitle className="text-lg font-medium text-[#003366]">Adicionar Nova Secretaria</DialogTitle>
          </DialogHeader>
          <div className="px-6 py-6">
            <div className="mb-5">
              <Label className="block mb-2 text-[15px] font-semibold text-gray-800">Nome da Secretaria</Label>
              <Input value={novaSecretaria.nome} onChange={e => setNovaSecretaria({ ...novaSecretaria, nome: e.target.value })} placeholder="Ex: Secretaria de Logística" className="w-full h-11 border border-gray-400 rounded-md px-3" />
            </div>
            <div className="mb-2">
              <Label className="block mb-2 text-[15px] font-semibold text-gray-800">Sigla</Label>
              <Input value={novaSecretaria.sigla} onChange={e => setNovaSecretaria({ ...novaSecretaria, sigla: e.target.value })} placeholder="Ex: SELOG" className="w-full h-11 border border-gray-400 rounded-md px-3" />
            </div>
          </div>
          <DialogFooter className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-2 rounded-b-md">
            <Button variant="outline" onClick={() => setIsNovaSecretariaModalOpen(false)} className="h-10 border-gray-400">Cancelar</Button>
            <Button onClick={handleAdicionarNovaSecretaria} className="bg-[#22c55e] text-white hover:bg-[#16a34a] h-10">Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}