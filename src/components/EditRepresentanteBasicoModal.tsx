import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';

export interface RepresentanteBase {
  id?: number;
  nome: string;
  secretaria: string;
  sigla_secretaria: string;
  departamento?: string;
  sigla_departamento?: string;
  cargo?: string;
  cce_fce?: string;
}

interface EditRepresentanteBasicoModalProps {
  isOpen: boolean;
  onClose: () => void;
  representanteId?: number | null;
  onSave: (data: Omit<RepresentanteBase, 'id'>) => Promise<void>;
  initialData?: RepresentanteBase | null; 
}

export function EditRepresentanteBasicoModal({
  isOpen,
  onClose,
  representanteId,
  onSave,
  initialData
}: EditRepresentanteBasicoModalProps) {
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '', secretaria: '', sigla_secretaria: '', departamento: '', sigla_departamento: '', cargo: '', cce_fce: ''
  });

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        nome: initialData.nome || '', secretaria: initialData.secretaria || '', sigla_secretaria: initialData.sigla_secretaria || '', 
        departamento: initialData.departamento || '', sigla_departamento: initialData.sigla_departamento || '', cargo: initialData.cargo || '', cce_fce: initialData.cce_fce || ''
      });
    } else if (isOpen) {
      setFormData({ nome: '', secretaria: '', sigla_secretaria: '', departamento: '', sigla_departamento: '', cargo: '', cce_fce: '' });
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // A validação de sigla continua nos bastidores, mas visualmente segue a foto
    if (!formData.nome.trim() || !formData.secretaria.trim()) {
      toast.error('Preencha os campos obrigatórios (Nome e Secretaria).');
      return;
    }
    try {
      setLoading(true);
      await onSave(formData);
      toast.success(representanteId ? 'Representante atualizado!' : 'Representante criado com sucesso!');
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Erro ao salvar o representante.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[300px] w-[95vw] bg-white p-0 rounded-lg shadow-lg border-0">
        
        <DialogHeader className="px-8 py-5 border-b border-gray-100">
          <DialogTitle className="text-[1.3rem] font-normal text-[#003366]">
            {representanteId ? 'Editar Representante' : 'Cadastrar Novo Representante'}
          </DialogTitle>
        </DialogHeader>

        <div className="px-8 py-6 flex flex-col gap-6">
          
          <div className="flex flex-col gap-2.5">
            <Label htmlFor="nome" className="text-[15px] font-medium text-gray-800">Nome</Label>
            <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} className="h-10 border-gray-300" />
          </div>
          
          <div className="flex flex-col gap-2.5">
            <Label htmlFor="cce_fce" className="text-[15px] font-medium text-gray-800">CCE/FCE</Label>
            <Input id="cce_fce" name="cce_fce" value={formData.cce_fce} onChange={handleChange} className="h-10 border-gray-300" />
          </div>

          <div className="flex flex-col gap-2.5">
            <Label htmlFor="cargo" className="text-[15px] font-medium text-gray-800">Cargo do Representante</Label>
            <Input id="cargo" name="cargo" value={formData.cargo} onChange={handleChange} className="h-10 border-gray-300" />
          </div>

          <div className="flex flex-col gap-2.5">
            <Label htmlFor="secretaria" className="text-[15px] font-medium text-gray-800">Secretaria</Label>
            <Select value={formData.secretaria} onValueChange={(val: string) => handleSelectChange('secretaria', val)}>
              <SelectTrigger className="bg-white h-10 border-gray-300">
                <SelectValue placeholder="Selecione a secretaria..." />
              </SelectTrigger>
              <SelectContent>
                {formData.secretaria && (
                    <SelectItem key={formData.secretaria} value={formData.secretaria}>{formData.secretaria}</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2.5">
            <Label htmlFor="departamento" className="text-[15px] font-medium text-gray-800">Departamento do Representante</Label>
            <Select value={formData.departamento || ""} onValueChange={(val: string) => handleSelectChange('departamento', val)}>
              <SelectTrigger className="bg-white h-10 border-gray-300">
                <SelectValue placeholder="Selecione o departamento..." />
              </SelectTrigger>
              <SelectContent>
                {formData.departamento && (
                    <SelectItem key={formData.departamento} value={formData.departamento}>{formData.departamento}</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

        </div>
        
        <DialogFooter className="px-8 py-5 border-t border-gray-100 flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={loading} className="border-gray-300 text-gray-700 hover:bg-gray-50 h-10 px-4">
            Descartar alterações
          </Button>
          <Button onClick={handleSubmit} className="bg-[#22c55e] text-white hover:bg-[#16a34a] h-10 px-4" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}