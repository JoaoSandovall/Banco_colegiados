import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

interface ViewRepresentacoesModalProps {
  isOpen: boolean;
  onClose: () => void;
  colegiado?: {
    id: number;
    nome_colegiado?: string;
    status_vigencia?: string;
    objeto_finalidade?: string;
    principal_subcolegiado?: string;
    interno_interministerial?: string;
    temas?: string;
    link_normativo?: string;
    coordenacao?: string;
    atuacao_midr?: string;
    numero_processo?: string;
    subcolegiado_ligado_ao?: string;
  } | null;
  representante?: {
    id: number;
    nome?: string;
  } | null;
}

export function ViewRepresentacoesModal({ isOpen, onClose, colegiado, representante }: ViewRepresentacoesModalProps) {
  const item = colegiado || representante;
  if (!item) return null;

  const isColegiado = !!colegiado;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isColegiado ? "Detalhes do Colegiado" : "Detalhes do Representante"}</DialogTitle>
        </DialogHeader>

        {isColegiado ? (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Nome do Colegiado</Label>
              <p className="text-sm text-gray-700">{colegiado!.nome_colegiado || "N/A"}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Status (Vigência)</Label>
                <p className="text-sm text-gray-700">{colegiado!.status_vigencia || "N/A"}</p>
              </div>
              <div className="grid gap-2">
                <Label>Nº do Processo</Label>
                <p className="text-sm text-gray-700">{colegiado!.numero_processo || "N/A"}</p>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Objeto (Finalidade)</Label>
              <p className="text-sm text-gray-700">{colegiado!.objeto_finalidade || "N/A"}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Principal/Subcolegiado</Label>
                <p className="text-sm text-gray-700">{colegiado!.principal_subcolegiado || "N/A"}</p>
              </div>
              <div className="grid gap-2">
                <Label>Interno/Interministerial</Label>
                <p className="text-sm text-gray-700">{colegiado!.interno_interministerial || "N/A"}</p>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Temas</Label>
              <p className="text-sm text-gray-700">{colegiado!.temas || "N/A"}</p>
            </div>

            <div className="grid gap-2">
              <Label>Coordenação</Label>
              <p className="text-sm text-gray-700">{colegiado!.coordenacao || "N/A"}</p>
            </div>

            <div className="grid gap-2">
              <Label>Atuação MIDR</Label>
              <p className="text-sm text-gray-700">{colegiado!.atuacao_midr || "N/A"}</p>
            </div>

            <div className="grid gap-2">
              <Label>Subcolegiado Ligado Ao</Label>
              <p className="text-sm text-gray-700">{colegiado!.subcolegiado_ligado_ao || "N/A"}</p>
            </div>

            {colegiado!.link_normativo && (
              <div className="grid gap-2">
                <Label>Link Normativo</Label>
                <a href={colegiado!.link_normativo} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {colegiado!.link_normativo}
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Nome do Representante</Label>
              <p className="text-sm text-gray-700">{representante!.nome || "N/A"}</p>
            </div>
            {/* Add more fields if needed */}
          </div>
        )}

        <DialogFooter>
          <Button onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
