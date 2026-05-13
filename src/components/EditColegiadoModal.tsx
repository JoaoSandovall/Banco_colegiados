import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import api from "../service/api";
import { Trash2 } from 'lucide-react';

interface EditColegiadoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  colegiado?: any;
  listaColegiados?: any[];
  onDelete?: (id: number) => Promise<void>;
}

export function EditColegiadoModal({ isOpen, onClose, colegiado, listaColegiados = [], onSave, onDelete }: EditColegiadoModalProps) {
  const defaultFormData = {
    nome_colegiado: "",
    status_vigencia: "",
    objeto_finalidade: "",
    principal_subcolegiado: "",
    interno_interministerial: "",
    temas: "",
    link_normativo: "",
    coordenacao: "",
    atuacao_midr: "",
    numero_processo: "",
    subcolegiado_ligado_ao: ""
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (colegiado) {
        setFormData({
          nome_colegiado: colegiado.nome_colegiado || "",
          status_vigencia: colegiado.status_vigencia || "",
          objeto_finalidade: colegiado.objeto_finalidade || "",
          principal_subcolegiado: colegiado.principal_subcolegiado || "",
          interno_interministerial: colegiado.interno_interministerial || "",
          temas: colegiado.temas || "",
          link_normativo: colegiado.link_normativo || "",
          coordenacao: colegiado.coordenacao || "",
          atuacao_midr: colegiado.atuacao_midr || "",
          numero_processo: colegiado.numero_processo || "",
          subcolegiado_ligado_ao: colegiado.subcolegiado_ligado_ao || ""
        });
      } else {
        setFormData(defaultFormData);
      }
    }
  }, [colegiado, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const requiredFields = [
      "nome_colegiado",
      "status_vigencia",
      "interno_interministerial",
      "objeto_finalidade",
      "principal_subcolegiado",
      "temas",
      "coordenacao",
      "atuacao_midr"
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]?.trim()) {
        alert(`O campo ${field.replace(/_/g, " ")} é obrigatório.`);
        return false;
      }
    }

    const nomeDigitado = formData.nome_colegiado.trim().toLowerCase();
    
    const nomeDuplicado = listaColegiados.some((c: any) => {
      const nomeExistente = c.nome_colegiado?.trim().toLowerCase() || "";
      return nomeExistente === nomeDigitado && c.id !== colegiado?.id;
    });

    if (nomeDuplicado) {
      alert("Operação bloqueada: Já existe um colegiado com este nome!");
      return false; 
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return; 
    }

    try {
      setIsLoading(true);

      if (colegiado) {
        await api.updateColegiado(colegiado.id, formData);
      } else {
        await api.createColegiado(formData);
      }
      
      alert("Colegiado salvo com sucesso!");
      onSave(); 
      onClose();

    } catch (error: any) {
      console.error("Erro no envio:", error);
      alert(error.message || "Erro ao salvar colegiado"); 
    } finally {
      setIsLoading(false);
    }
  };
  
  const opcoesLigacao = listaColegiados.filter(
    (c) => c.nome_colegiado !== formData.nome_colegiado && c.principal_subcolegiado === "Principal"
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {colegiado ? "Detalhes e Edição do Colegiado" : "Novo Colegiado"}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="nome_colegiado">Nome do Colegiado *</Label>
              <Input id="nome_colegiado" name="nome_colegiado" value={formData.nome_colegiado} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Status (Vigência) *</Label>
                <Select value={formData.status_vigencia} onValueChange={(v: string) => handleSelectChange("status_vigencia", v)}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Âmbito (Interno/Interministerial) *</Label>
                <Select value={formData.interno_interministerial} onValueChange={(v: string) => handleSelectChange("interno_interministerial", v)}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Interno">Interno</SelectItem>
                    <SelectItem value="Interministerial">Interministerial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Nº do Processo</Label>
              <Input name="numero_processo" value={formData.numero_processo} onChange={handleChange} />
            </div>

            <div className="grid gap-2">
              <Label>Objeto (Finalidade) *</Label>
              <Textarea name="objeto_finalidade" value={formData.objeto_finalidade} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Tipo de Colegiado *</Label>
                <Select 
                  value={formData.principal_subcolegiado} 
                  onValueChange={(v: string) => {
                    if (v === "Principal") {
                      setFormData(prev => ({ ...prev, principal_subcolegiado: v, subcolegiado_ligado_ao: "" }));
                    } else {
                      setFormData(prev => ({ ...prev, principal_subcolegiado: v }));
                    }
                  }}
                >
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Principal">Principal</SelectItem>
                    <SelectItem value="Subcolegiado">Subcolegiado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.principal_subcolegiado !== "Principal" && (
                <div className="grid gap-2">
                  <Label>Subcolegiado ligado ao</Label>
                  <Select value={formData.subcolegiado_ligado_ao} onValueChange={(v: string) => handleSelectChange("subcolegiado_ligado_ao", v)}>
                    <SelectTrigger><SelectValue placeholder="Nenhum" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value=" ">Nenhum</SelectItem>
                      {opcoesLigacao.map((c) => (
                        <SelectItem key={c.id} value={c.nome_colegiado}>
                          {c.nome_colegiado}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Atuação MIDR *</Label>
                <Select value={formData.atuacao_midr} onValueChange={(v: string) => handleSelectChange("atuacao_midr", v)}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Preside">Preside</SelectItem>
                    <SelectItem value="Coordena">Coordena</SelectItem>
                    <SelectItem value="Participa">Participa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Temas *</Label>
              <Input name="temas" value={formData.temas} onChange={handleChange} />
            </div>

            <div className="grid gap-2">
              <Label>Coordenação *</Label>
              <Input name="coordenacao" value={formData.coordenacao} onChange={handleChange} />
            </div>

            <div className="grid gap-2">
              <Label>Link do Normativo</Label>
              <Input name="link_normativo" value={formData.link_normativo} onChange={handleChange} />
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between rounded-b-md">
          <div className="flex-1">
            {colegiado && (
              <Button 
                type="button"
                onClick={() => onDelete && onDelete(colegiado.id)} 
                style={{ backgroundColor: '#ef4444', color: '#ffffff' }}
                className="border-0 h-10 flex items-center gap-2 shadow-sm hover:opacity-80 transition-opacity"
              >
                <Trash2 size={16} /> Excluir Colegiado
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button onClick={handleSubmit} disabled={isLoading} className="bg-[#22c55e] text-white">
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}