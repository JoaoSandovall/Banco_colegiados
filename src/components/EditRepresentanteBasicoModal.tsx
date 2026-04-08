import { useState } from 'react';
import { Resizable } from 're-resizable';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogOverlay, DialogPortal } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface EditRepresentanteBasicoModalProps {
  isOpen: boolean;
  onClose: () => void;
  representante: {
    id: number;
    nome: string;
  } | null;
}

export function EditRepresentanteBasicoModal({ isOpen, onClose, representante }: EditRepresentanteBasicoModalProps) {
  const [size, setSize] = useState({ width: '900px', height: '650px' });

  if (!representante) return null;

  const handleSave = () => {
    console.log('Salvando dados básicos do representante:', representante.id);
    onClose();
  };

  const handleDiscard = () => {
    console.log('Descartando alterações');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/50" />
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Resizable
            size={{ width: size.width, height: size.height }}
            onResizeStop={(e, direction, ref, d) => {
              setSize({
                width: ref.style.width,
                height: ref.style.height,
              });
            }}
            minWidth="600px"
            minHeight="500px"
            maxWidth="95vw"
            maxHeight="95vh"
            enable={{
              top: true,
              right: true,
              bottom: true,
              left: true,
              topRight: true,
              bottomRight: true,
              bottomLeft: true,
              topLeft: true,
            }}
            className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col"
            handleStyles={{
              top: { cursor: 'ns-resize', height: '8px', top: '-4px' },
              right: { cursor: 'ew-resize', width: '8px', right: '-4px' },
              bottom: { cursor: 'ns-resize', height: '8px', bottom: '-4px' },
              left: { cursor: 'ew-resize', width: '8px', left: '-4px' },
              topRight: { cursor: 'nesw-resize', width: '12px', height: '12px', top: '-6px', right: '-6px' },
              bottomRight: { cursor: 'nwse-resize', width: '12px', height: '12px', bottom: '-6px', right: '-6px' },
              bottomLeft: { cursor: 'nesw-resize', width: '12px', height: '12px', bottom: '-6px', left: '-6px' },
              topLeft: { cursor: 'nwse-resize', width: '12px', height: '12px', top: '-6px', left: '-6px' },
            }}
          >
            <DialogTitle className="sr-only">
              Editar Representante: {representante.nome}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Formulário para editar dados básicos do representante
            </DialogDescription>
            
            {/* Header */}
            <div className="bg-white border-b border-[#e5e7eb] px-10 py-6 flex-shrink-0">
              <h2 className="text-[#003366] text-xl">
                Editar Representante
              </h2>
            </div>

            {/* Conteúdo scrollável */}
            <div className="flex-1 overflow-y-auto px-10 py-8">
              <div className="max-w-[800px] mx-auto space-y-6">
                
                {/* Nome */}
                <div>
                  <Label htmlFor="nome" className="text-[#1a1a1a] mb-3 block text-base">
                    Nome
                  </Label>
                  <Input
                    id="nome"
                    type="text"
                    placeholder="Digite o nome completo"
                    className="bg-white border-[#e5e7eb] h-12 text-base"
                    defaultValue={representante.nome}
                  />
                </div>

                {/* CCE/FCE */}
                <div>
                  <Label htmlFor="cce-fce" className="text-[#1a1a1a] mb-3 block text-base">
                    CCE/FCE
                  </Label>
                  <Input
                    id="cce-fce"
                    type="text"
                    placeholder="Digite o CCE/FCE"
                    className="bg-white border-[#e5e7eb] h-12 text-base"
                    defaultValue="12345678"
                  />
                </div>

                {/* Cargo do Representante */}
                <div>
                  <Label htmlFor="cargo" className="text-[#1a1a1a] mb-3 block text-base">
                    Cargo do Representante
                  </Label>
                  <Input
                    id="cargo"
                    type="text"
                    placeholder="Ex: Secretário Executivo"
                    className="bg-white border-[#e5e7eb] h-12 text-base"
                    defaultValue="Diretor de Departamento"
                  />
                </div>

                {/* Secretaria */}
                <div>
                  <Label htmlFor="secretaria" className="text-[#1a1a1a] mb-3 block text-base">
                    Secretaria
                  </Label>
                  <Select defaultValue="snsh">
                    <SelectTrigger id="secretaria" className="bg-white border-[#e5e7eb] h-12 text-base">
                      <SelectValue placeholder="Selecione a secretaria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="snsh">Secretaria Nacional de Segurança Hídrica</SelectItem>
                      <SelectItem value="sdr">Secretaria de Desenvolvimento Regional</SelectItem>
                      <SelectItem value="gab">Gabinete</SelectItem>
                      <SelectItem value="se">Secretaria Executiva</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Departamento do representante */}
                <div>
                  <Label htmlFor="departamento" className="text-[#1a1a1a] mb-3 block text-base">
                    Departamento do Representante
                  </Label>
                  <Select defaultValue="dprh">
                    <SelectTrigger id="departamento" className="bg-white border-[#e5e7eb] h-12 text-base">
                      <SelectValue placeholder="Selecione o departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dprh">Departamento de Políticas de Recursos Hídricos</SelectItem>
                      <SelectItem value="dhid">Departamento de Hidrografia</SelectItem>
                      <SelectItem value="dseg">Departamento de Segurança Hídrica</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-[#e5e7eb] px-10 py-5 flex-shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-4">
              <Button
                type="button"
                onClick={handleDiscard}
                variant="outline"
                className="border-[#e5e7eb] text-[#1a1a1a] hover:bg-[#f3f4f6] w-full sm:w-auto h-11 px-6 text-base"
              >
                Descartar alterações
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                className="bg-[#22c55e] hover:bg-[#16a34a] text-white w-full sm:w-auto h-11 px-6 text-base"
              >
                Salvar alterações
              </Button>
            </div>
          </Resizable>
        </div>
      </DialogPortal>
    </Dialog>
  );
}
