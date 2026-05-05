import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { Link2, Calendar, FileText } from 'lucide-react';

interface EditRepresentacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  representacaoId?: number | null;
  colegiadoId?: number;
  onSave: (data: any) => Promise<void>;
  initialData?: any | null;
  pessoasDisponiveis?: any[]; 
  colegiadosDisponiveis?: any[];
}

export function EditRepresentacaoModal({
  isOpen, onClose, representacaoId, colegiadoId, onSave, initialData, pessoasDisponiveis = [], colegiadosDisponiveis = []
}: EditRepresentacaoModalProps) {
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    colegiado_id: '', representante_id: '', status: '', tipo_representacao: '', data_ato_indicacao: '', ato_indicacao: '', link_portaria: '', numero_processo: '', data_expiracao: ''
  });

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        colegiado_id: initialData.colegiado_id?.toString() || colegiadoId?.toString() || '',
        representante_id: initialData.representante_id?.toString() || '',
        status: initialData.status || '', tipo_representacao: initialData.tipo_representacao || '', data_ato_indicacao: initialData.data_ato_indicacao || '', ato_indicacao: initialData.ato_indicacao || '', link_portaria: initialData.link_portaria || '', numero_processo: initialData.numero_processo || '', data_expiracao: initialData.data_expiracao || ''
      });
    } else if (isOpen) {
      setFormData({
        colegiado_id: colegiadoId ? colegiadoId.toString() : '',
        representante_id: '', status: '', tipo_representacao: '', data_ato_indicacao: '', ato_indicacao: '', link_portaria: '', numero_processo: '', data_expiracao: ''
      });
    }
  }, [initialData, isOpen, colegiadoId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSelectChange = (name: string, value: string) => setFormData(prev => ({ ...prev, [name]: value }));

  const handleSubmit = async () => {
    if (!formData.representante_id || !formData.colegiado_id || !formData.status || !formData.tipo_representacao) {
      toast.error('Preencha os campos obrigatórios (Colegiado, Servidor, Status e Tipo).'); return;
    }
    
    // Tratamento de segurança: Garante que os dados em branco sejam enviados como NULL e não quebrem o backend
    const payload: any = { ...formData, colegiado_id: parseInt(formData.colegiado_id), representante_id: parseInt(formData.representante_id) };
    if (!payload.data_ato_indicacao) payload.data_ato_indicacao = null;
    if (!payload.data_expiracao) payload.data_expiracao = null;
    
    try {
      setLoading(true); await onSave(payload);
      onClose();
    } catch (error: any) { toast.error(error.message || 'Erro ao salvar.'); } finally { setLoading(false); }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#003366] flex items-center gap-2"><Link2 className="text-[#ea580c]" /> {representacaoId ? 'Editar Vínculo' : 'Vincular a um Colegiado'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2"><FileText size={16} /> Entidades Envolvidas</h4>
            <div className="grid gap-2">
              <Label>Colegiado <span className="text-red-500">*</span></Label>
              <Select value={formData.colegiado_id} onValueChange={(val: string) => handleSelectChange('colegiado_id', val)} disabled={!!representacaoId}>
                <SelectTrigger className="bg-white"><SelectValue placeholder="Selecione o conselho..." /></SelectTrigger>
                <SelectContent>
                  {colegiadosDisponiveis.map(col => <SelectItem key={col.id} value={col.id.toString()}>{col.nome_colegiado}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Servidor (Pessoa) <span className="text-red-500">*</span></Label>
              <Select value={formData.representante_id} onValueChange={(val: string) => handleSelectChange('representante_id', val)} disabled={!!representacaoId || (!!initialData?.representante_id)}>
                <SelectTrigger className="bg-white"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                <SelectContent>
                  {pessoasDisponiveis.map(p => <SelectItem key={p.id} value={p.id.toString()}>{p.nome} - {p.sigla_secretaria}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2"><Label>Status <span className="text-red-500">*</span></Label><Select value={formData.status} onValueChange={(val: string) => handleSelectChange('status', val)}><SelectTrigger className="bg-white"><SelectValue placeholder="Selecione..." /></SelectTrigger><SelectContent><SelectItem value="Ativo">Ativo</SelectItem><SelectItem value="Inativo">Inativo</SelectItem><SelectItem value="Exonerado">Exonerado</SelectItem><SelectItem value="Em estruturação">Em estruturação</SelectItem></SelectContent></Select></div>
              <div className="grid gap-2"><Label>Tipo <span className="text-red-500">*</span></Label><Select value={formData.tipo_representacao} onValueChange={(val: string) => handleSelectChange('tipo_representacao', val)}><SelectTrigger className="bg-white"><SelectValue placeholder="Selecione..." /></SelectTrigger><SelectContent><SelectItem value="Titular">Titular</SelectItem><SelectItem value="Suplente">Suplente</SelectItem><SelectItem value="Ponto focal">Ponto focal</SelectItem></SelectContent></Select></div>
            </div>
          </div>
          <div className="space-y-4 bg-white p-4 rounded-lg border border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2"><Calendar size={16} /> Vigência</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2"><Label>Data Ato</Label><Input type="date" name="data_ato_indicacao" value={formData.data_ato_indicacao} onChange={handleChange} /></div>
              <div className="grid gap-2"><Label>Data Expiração</Label><Input type="date" name="data_expiracao" value={formData.data_expiracao} onChange={handleChange} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2"><Label>Ato (Portaria)</Label><Input name="ato_indicacao" value={formData.ato_indicacao} onChange={handleChange} placeholder="Ex: Portaria 123" /></div>
              <div className="grid gap-2"><Label>Processo SEI</Label><Input name="numero_processo" value={formData.numero_processo} onChange={handleChange} /></div>
            </div>
          </div>
        </div>
        <DialogFooter className="pt-4 border-t"><Button variant="outline" onClick={onClose} disabled={loading}>Cancelar</Button><Button onClick={handleSubmit} className="bg-[#003366] text-white" disabled={loading}>{loading ? 'Salvando...' : 'Salvar Vínculo'}</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}