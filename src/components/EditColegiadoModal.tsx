import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface EditColegiadoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  colegiado?: any;
}

export function EditColegiadoModal({ isOpen, onClose, onSave }: EditColegiadoModalProps) {
  // Estado com todas as colunas que você definiu
  const [formData, setFormData] = useState({
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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/colegiados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Colegiado salvo com sucesso no banco!");
        onSave(); // Recarrega a lista
        onClose(); // Fecha o modal
      }
    } catch (error) {
      console.error("Erro ao conectar com o backend:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Colegiado</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="nome_colegiado">Nome do Colegiado</Label>
            <Input id="nome_colegiado" name="nome_colegiado" value={formData.nome_colegiado} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Status (Vigência)</Label>
              <Input name="status_vigencia" value={formData.status_vigencia} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label>Nº do Processo</Label>
              <Input name="numero_processo" value={formData.numero_processo} onChange={handleChange} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Objeto (Finalidade)</Label>
            <Textarea name="objeto_finalidade" value={formData.objeto_finalidade} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Principal/Subcolegiado</Label>
              <Input name="principal_subcolegiado" value={formData.principal_subcolegiado} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label>Interno/Interministerial</Label>
              <Input name="interno_interministerial" value={formData.interno_interministerial} onChange={handleChange} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Temas</Label>
            <Input name="temas" value={formData.temas} onChange={handleChange} />
          </div>

          <div className="grid gap-2">
            <Label>Link do Normativo</Label>
            <Input name="link_normativo" value={formData.link_normativo} onChange={handleChange} />
          </div>

          <div className="grid gap-2">
            <Label>Coordenação</Label>
            <Input name="coordenacao" value={formData.coordenacao} onChange={handleChange} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Salvar no Banco</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}