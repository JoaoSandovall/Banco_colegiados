import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';

interface ViewColegiadoModalProps {
  isOpen: boolean;
  onClose: () => void;
  colegiado: any | null;
}

export function ViewColegiadoModal({ isOpen, onClose, colegiado }: ViewColegiadoModalProps) {
  if (!colegiado) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent style={{ maxWidth: '800px', width: '95%' }} className="bg-white p-0 rounded-md border-0 shadow-xl">
        <DialogHeader className="px-6 py-5 border-b border-gray-200 bg-gray-50 rounded-t-md">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Informações do Colegiado</span>
            <DialogTitle className="text-2xl font-extrabold text-[#003366] mt-1">
              {colegiado.nome_colegiado}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="px-6 py-6 max-h-[70vh] overflow-y-auto space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="block mb-1 text-[12px] text-gray-500 uppercase tracking-wider font-bold">Status (Vigência)</Label>
              <div className="text-[15px] text-gray-900 bg-gray-50 p-2 rounded border border-gray-100">
                {colegiado.status_vigencia || 'N/A'}
              </div>
            </div>
            <div>
              <Label className="block mb-1 text-[12px] text-gray-500 uppercase tracking-wider font-bold">Nº do Processo</Label>
              <div className="text-[15px] text-gray-900 bg-gray-50 p-2 rounded border border-gray-100">
                {colegiado.numero_processo || 'N/A'}
              </div>
            </div>
          </div>

          <div>
            <Label className="block mb-1 text-[12px] text-gray-500 uppercase tracking-wider font-bold">Objeto (Finalidade)</Label>
            <div className="text-[15px] text-gray-900 bg-gray-50 p-3 rounded border border-gray-100 whitespace-pre-wrap">
              {colegiado.objeto_finalidade || 'N/A'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="block mb-1 text-[12px] text-gray-500 uppercase tracking-wider font-bold">Principal / Subcolegiado</Label>
              <div className="text-[15px] text-gray-900 bg-gray-50 p-2 rounded border border-gray-100">
                {colegiado.principal_subcolegiado || 'N/A'}
              </div>
            </div>
            <div>
              <Label className="block mb-1 text-[12px] text-gray-500 uppercase tracking-wider font-bold">Interno / Interministerial</Label>
              <div className="text-[15px] text-gray-900 bg-gray-50 p-2 rounded border border-gray-100">
                {colegiado.interno_interministerial || 'N/A'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="block mb-1 text-[12px] text-gray-500 uppercase tracking-wider font-bold">Coordenação</Label>
              <div className="text-[15px] text-gray-900 bg-gray-50 p-2 rounded border border-gray-100">
                {colegiado.coordenacao || 'N/A'}
              </div>
            </div>
            <div>
              <Label className="block mb-1 text-[12px] text-gray-500 uppercase tracking-wider font-bold">Atuação do MIDR</Label>
              <div className="text-[15px] text-gray-900 bg-gray-50 p-2 rounded border border-gray-100">
                {colegiado.atuacao_midr || 'N/A'}
              </div>
            </div>
          </div>

          {colegiado.link_normativo && (
            <div>
              <Label className="block mb-1 text-[12px] text-gray-500 uppercase tracking-wider font-bold">Link do Normativo</Label>
              <a href={colegiado.link_normativo} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm break-all">
                {colegiado.link_normativo}
              </a>
            </div>
          )}
        </div>

        <DialogFooter className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end rounded-b-md">
          <Button onClick={onClose} className="bg-[#003366] text-white hover:bg-[#002244] h-10 px-6">
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}