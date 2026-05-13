import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Pencil, Users, UserPlus, Trash2 } from 'lucide-react';
import api from '../service/api';

interface ViewRepresentacoesModalProps {
  isOpen: boolean;
  onClose: () => void;
  colegiado?: {
    id: number; nome_colegiado?: string; status_vigencia?: string; objeto_finalidade?: string;
    principal_subcolegiado?: string; interno_interministerial?: string; temas?: string; link_normativo?: string;
    coordenacao?: string; atuacao_midr?: string; numero_processo?: string; subcolegiado_ligado_ao?: string;
  } | null;
  representante?: { id: number; nome?: string; } | null;
  onOpenVinculo?: (colegiadoId: number) => void;
  onOpenVinculoPessoa?: (representanteId: number) => void;
  onEditRepresentacao?: (representacaoId: number) => void;
  onDeleteRepresentacao?: (representacaoId: number) => void; // NOVO
  refreshTrigger?: number;
  listaColegiados?: any[]; 
}

export function ViewRepresentacoesModal({ 
  isOpen, onClose, colegiado, representante, onOpenVinculo, onOpenVinculoPessoa, onEditRepresentacao, onDeleteRepresentacao, refreshTrigger, listaColegiados = [] 
}: ViewRepresentacoesModalProps) {
  
  const [representacoes, setRepresentacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const isColegiado = !!colegiado;
  const isPessoa = !!representante;

  useEffect(() => {
    if (!isOpen) return;

    setLoading(true);
    if (isColegiado && colegiado?.id) {
      api.getRepresentacoesPorColegiado(colegiado.id)
        .then(data => setRepresentacoes(data))
        .catch(error => console.error("Erro:", error))
        .finally(() => setLoading(false));
    } else if (isPessoa && representante?.id) {
      if(api.getAllRepresentacoes) {
        api.getAllRepresentacoes()
          .then(data => {
            const vinculadas = data.filter((r: any) => r.representante.id === representante.id);
            setRepresentacoes(vinculadas);
          })
          .catch(error => console.error("Erro:", error))
          .finally(() => setLoading(false));
      }
    }
  }, [isOpen, isColegiado, colegiado, isPessoa, representante, refreshTrigger]);

  if (!colegiado && !representante) return null;

  const getStatusColor = (status: string) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('ativo')) return 'bg-[#dcfce7] text-[#166534] border-[#86efac]';
    if (s.includes('inativo')) return 'bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]';
    return 'bg-[#e5e7eb] text-[#1a1a1a] border-[#d1d5db]';
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este vínculo permanentemente?")) {
      if (onDeleteRepresentacao) onDeleteRepresentacao(id);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent style={{ maxWidth: '700px', width: '98%', height: '70vh' }} className="bg-white p-0 rounded-md border-0 shadow-xl flex flex-col">
        
        {isPessoa && (
          <>
            <div className="flex justify-between items-center gap-4 p-6 pb-5 border-b pr-14 shrink-0 bg-slate-50/50">
              <div className="flex-1 flex flex-col items-start gap-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Vínculos do Representante
                </p>
                <DialogTitle className="text-2xl font-extrabold text-[#2563eb] bg-blue-50/60 px-3 py-1.5 rounded-md border border-blue-200 inline-block shadow-sm">
                  {representante!.nome}
                </DialogTitle>
              </div>
              <Button onClick={() => onOpenVinculoPessoa && onOpenVinculoPessoa(representante!.id)} className="bg-[#003366] text-white hover:bg-[#002244] flex items-center gap-2 shrink-0 h-10 px-4">
                <UserPlus size={18} /> Vincular a Novo Colegiado
              </Button>
            </div>

            <div className="p-6 pt-4 flex-1 overflow-y-auto">
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#f9fafb]">
                      <TableHead className="font-semibold text-[#003366] min-w-[300px]">Nome do Colegiado</TableHead>
                      <TableHead className="font-semibold text-[#003366] w-[200px]">Tipo de Representação</TableHead>
                      <TableHead className="font-semibold text-[#003366] w-[140px]">Status</TableHead>
                      <TableHead className="font-semibold text-[#003366] w-[160px] text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow><TableCell colSpan={4} className="text-center py-8">Carregando dados...</TableCell></TableRow>
                    ) : representacoes.length === 0 ? (
                      <TableRow><TableCell colSpan={4} className="text-center py-10 text-gray-500">Este representante não atua em nenhum colegiado.</TableCell></TableRow>
                    ) : (
                      representacoes.map((rep) => {
                        const nomeColegiado = rep.colegiado?.nome_colegiado || listaColegiados.find(c => c.id === rep.colegiado_id)?.nome_colegiado || "Colegiado não identificado";
                        return (
                          <TableRow key={rep.id}>
                            <TableCell className="text-[#1a1a1a] font-medium">{nomeColegiado}</TableCell>
                            <TableCell className="text-[#1a1a1a]">{rep.tipo_representacao}</TableCell>
                            <TableCell><Badge variant="outline" className={`${getStatusColor(rep.status)} border font-normal px-3 py-1`}>{rep.status}</Badge></TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end items-center gap-2">
                                <Button variant="outline" size="sm" onClick={() => onEditRepresentacao && onEditRepresentacao(rep.id)} className="border-[#d1d5db] text-[#1a1a1a] hover:bg-[#f3f4f6]">
                                  <Pencil size={14} />
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleDelete(rep.id)} className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                                  <Trash2 size={14} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="p-4 px-6 border-t shrink-0 flex justify-end bg-slate-50/50">
              <Button onClick={onClose} className="bg-[#003366] text-white hover:bg-[#002244]">Fechar</Button>
            </div>
          </>
        )}

        {isColegiado && (
          <>
            <div className="flex justify-between items-center gap-4 p-6 pb-5 border-b pr-14 shrink-0 bg-slate-50/50">
              <div className="flex-1 flex flex-col items-start gap-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Membros do Colegiado
                </p>
                <DialogTitle className="text-2xl font-extrabold text-[#003366] bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200 inline-block shadow-sm">
                  {colegiado!.nome_colegiado}
                </DialogTitle>
              </div>
              <Button onClick={() => onOpenVinculo && onOpenVinculo(colegiado!.id)} className="bg-[#003366] text-white hover:bg-[#002244] flex items-center gap-2 shrink-0 h-10 px-4">
                <UserPlus size={18} /> Vincular Representante
              </Button>
            </div>

            <div className="p-6 pt-6 flex-1 overflow-y-auto">
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#f9fafb]">
                      <TableHead className="font-semibold text-[#003366]">Nome</TableHead>
                      <TableHead className="font-semibold text-[#003366]">Órgão</TableHead>
                      <TableHead className="font-semibold text-[#003366] w-[140px]">Tipo</TableHead>
                      <TableHead className="font-semibold text-[#003366] w-[140px]">Status</TableHead>
                      <TableHead className="font-semibold text-[#003366] w-[120px] text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow><TableCell colSpan={5} className="text-center py-8">Carregando dados...</TableCell></TableRow>
                    ) : representacoes.length === 0 ? (
                      <TableRow><TableCell colSpan={5} className="text-center py-10 text-gray-500">Este colegiado não possui representantes vinculados.</TableCell></TableRow>
                    ) : (
                      representacoes.map((rep) => (
                        <TableRow key={rep.id} className="hover:bg-slate-50">
                          <TableCell className="font-medium text-[#1a1a1a]">{rep.representante?.nome}</TableCell>
                          <TableCell className="text-gray-600">{rep.representante?.sigla_secretaria}</TableCell>
                          <TableCell className="text-gray-600">{rep.tipo_representacao}</TableCell>
                          <TableCell><Badge variant="outline" className={`${getStatusColor(rep.status)} border font-normal px-3 py-1`}>{rep.status}</Badge></TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end items-center gap-2">
                              <Button variant="outline" size="sm" onClick={() => onEditRepresentacao && onEditRepresentacao(rep.id)} className="border-[#d1d5db] text-[#1a1a1a] hover:bg-[#f3f4f6]">
                                <Pencil size={14} />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleDelete(rep.id)} className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="p-4 px-6 border-t shrink-0 flex justify-end bg-slate-50/50">
              <Button onClick={onClose} className="bg-[#003366] text-white hover:bg-[#002244] h-10 px-6">Fechar</Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}