import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';

import { RepresentanteBase } from './EditRepresentanteBasicoModal'; 

interface ViewRepresentanteModalProps {
  isOpen: boolean;
  onClose: () => void;
  representante: RepresentanteBase | null;
}

// O ERRO ACONTECE SE FALTAR ESTA PALAVRA "export" AQUI EMBAIXO:
export function ViewRepresentanteModal({ isOpen, onClose, representante }: ViewRepresentanteModalProps) {
  if (!representante) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent style={{ maxWidth: '650px', width: '95%' }} className="bg-white p-0 rounded-md border-0 shadow-xl">
        
        <DialogHeader className="px-6 py-5 border-b border-gray-200">
          <DialogTitle className="text-xl font-medium text-[#003366]">
            Ficha do Representante
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-6 max-h-[70vh] overflow-y-auto space-y-6">
          
          <div>
            <Label className="block mb-1 text-[12px] text-gray-500 uppercase tracking-wider font-bold">Nome Completo</Label>
            <div className="text-[16px] text-gray-900 font-medium bg-gray-50 p-3 rounded border border-gray-100">
              {representante.nome}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="block mb-1 text-[12px] text-gray-500 uppercase tracking-wider font-bold">Status</Label>
              <div className="text-[15px] text-gray-900">
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  representante.status === 'Inativo' ? 'bg-red-100 text-red-700' :
                  representante.status === 'Exonerado' ? 'bg-gray-200 text-gray-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {representante.status || 'Ativo'}
                </span>
              </div>
            </div>
            <div>
              <Label className="block mb-1 text-[12px] text-gray-500 uppercase tracking-wider font-bold">CCE/FCE</Label>
              <div className="text-[15px] text-gray-900 bg-gray-50 p-2 rounded border border-gray-100">
                {representante.cce_fce || '-'}
              </div>
            </div>
          </div>

          <div>
            <Label className="block mb-1 text-[12px] text-gray-500 uppercase tracking-wider font-bold">Cargo</Label>
            <div className="text-[15px] text-gray-900 bg-gray-50 p-3 rounded border border-gray-100">
              {representante.cargo || 'Não informado'}
            </div>
          </div>

          <hr className="border-gray-200" />

          <div>
            <Label className="block mb-1 text-[12px] text-gray-500 uppercase tracking-wider font-bold">Secretaria</Label>
            <div className="text-[15px] text-gray-900 bg-gray-50 p-3 rounded border border-gray-100">
              {representante.secretaria} {representante.sigla_secretaria ? `(${representante.sigla_secretaria})` : ''}
            </div>
          </div>

          <div>
            <Label className="block mb-1 text-[12px] text-gray-500 uppercase tracking-wider font-bold">Departamento</Label>
            <div className="text-[15px] text-gray-900 bg-gray-50 p-3 rounded border border-gray-100">
              {representante.departamento || 'Não informado'}
            </div>
          </div>

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