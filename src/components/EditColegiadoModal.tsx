import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Resizable } from 're-resizable';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogOverlay, DialogPortal } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface EditColegiadoModalProps {
  isOpen: boolean;
  onClose: () => void;
  colegiado: {
    id: string;
    nome: string;
  } | null;
}

export function EditColegiadoModal({ isOpen, onClose, colegiado }: EditColegiadoModalProps) {
  const [size, setSize] = useState({ width: '85vw', height: '85vh' });

  if (!colegiado) return null;

  const handleSave = () => {
    console.log('Saving changes for colegiado:', colegiado.id);
    onClose();
  };

  const handleDiscard = () => {
    console.log('Discarding changes');
    onClose();
  };

  const handleDelete = () => {
    console.log('Deleting colegiado:', colegiado.id);
    onClose();
  };

  const handleAddCoordenacao = () => {
    console.log('Adding coordenação');
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
            minWidth="60vw"
            minHeight="60vh"
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
              Editar Colegiado: {colegiado.nome}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Formulário para editar informações do colegiado
            </DialogDescription>
            
            {/* Header */}
            <div className="bg-white border-b border-[#e5e7eb] px-14 py-8 flex-shrink-0">
              <h2 className="text-[#003366] text-2xl">
                Nome do Colegiado: {colegiado.nome}
              </h2>
            </div>

            {/* Conteúdo scrollável */}
            <div className="flex-1 overflow-y-auto px-14 py-10">
              <div className="max-w-[1800px] mx-auto space-y-10">
                
                {/* Objeto - Full width */}
                <div>
                  <Label htmlFor="objeto" className="text-[#1a1a1a] mb-3 block text-base">
                    Objeto (Finalidade)
                  </Label>
                  <Textarea
                    id="objeto"
                    placeholder="Descrever o objeto e finalidade do colegiado..."
                    className="min-h-[140px] resize-none border-[#e5e7eb] bg-white text-base p-4"
                    defaultValue="O Conselho Nacional de Recursos Hídricos é um órgão consultivo e deliberativo, que compõe o Sistema Nacional de Gerenciamento de Recursos Hídricos."
                  />
                </div>

                {/* Layout de duas colunas */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-20 gap-y-10">
                  
                  {/* Coluna 1: Classificação */}
                  <div className="space-y-8">
                    <h3 className="text-[#003366] text-xl mb-8">Classificação</h3>

                    <div>
                      <Label htmlFor="status" className="text-[#1a1a1a] mb-3 block text-base">
                        Status (Vigência)
                      </Label>
                      <Select defaultValue="ativo">
                        <SelectTrigger id="status" className="bg-white border-[#e5e7eb] h-14 text-base">
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ativo">Ativo</SelectItem>
                          <SelectItem value="inativo">Inativo</SelectItem>
                          <SelectItem value="em-estruturacao">Em estruturação</SelectItem>
                          <SelectItem value="extinto">Extinto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="interno-ministerial" className="text-[#1a1a1a] mb-3 block text-base">
                        Interno/Interministerial
                      </Label>
                      <Select defaultValue="interministerial">
                        <SelectTrigger id="interno-ministerial" className="bg-white border-[#e5e7eb] h-14 text-base">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="interno">Interno</SelectItem>
                          <SelectItem value="interministerial">Interministerial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="atuacao-midr" className="text-[#1a1a1a] mb-3 block text-base">
                        Atuação MIDR
                      </Label>
                      <Select defaultValue="membro">
                        <SelectTrigger id="atuacao-midr" className="bg-white border-[#e5e7eb] h-14 text-base">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="membro">Membro</SelectItem>
                          <SelectItem value="coordenacao">Coordenação</SelectItem>
                          <SelectItem value="observador">Observador</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="principal-sub" className="text-[#1a1a1a] mb-3 block text-base">
                        Principal/Subcolegiado
                      </Label>
                      <Select defaultValue="principal">
                        <SelectTrigger id="principal-sub" className="bg-white border-[#e5e7eb] h-14 text-base">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="principal">Principal</SelectItem>
                          <SelectItem value="subcolegiado">Subcolegiado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="prazo" className="text-[#1a1a1a] mb-3 block text-base">
                        Prazo do colegiado
                      </Label>
                      <Input
                        id="prazo"
                        type="date"
                        className="bg-white border-[#e5e7eb] h-14 text-base"
                        defaultValue="2026-12-31"
                      />
                    </div>
                  </div>

                  {/* Coluna 2: Detalhes */}
                  <div className="space-y-8">
                    <h3 className="text-[#003366] text-xl mb-8">Detalhes</h3>

                    <div>
                      <Label htmlFor="temas" className="text-[#1a1a1a] mb-3 block text-base">
                        Temas
                      </Label>
                      <Select defaultValue="recursos-hidricos">
                        <SelectTrigger id="temas" className="bg-white border-[#e5e7eb] h-14 text-base">
                          <SelectValue placeholder="Selecione os temas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recursos-hidricos">Recursos Hídricos</SelectItem>
                          <SelectItem value="desenvolvimento-regional">Desenvolvimento Regional</SelectItem>
                          <SelectItem value="seguranca-hidrica">Segurança Hídrica</SelectItem>
                          <SelectItem value="meio-ambiente">Meio Ambiente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="coordenacao" className="text-[#1a1a1a] mb-3 block text-base">
                        Coordenação
                      </Label>
                      <div className="flex gap-4">
                        <Select defaultValue="sdr">
                          <SelectTrigger id="coordenacao" className="bg-white border-[#e5e7eb] flex-1 h-14 text-base">
                            <SelectValue placeholder="Selecione a coordenação" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sdr">SDR - Secretaria de Desenvolvimento Regional</SelectItem>
                            <SelectItem value="snsh">SNSH - Secretaria Nacional de Segurança Hídrica</SelectItem>
                            <SelectItem value="gab">GAB - Gabinete</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          onClick={handleAddCoordenacao}
                          className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-6 h-14"
                        >
                          <Plus className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="processo" className="text-[#1a1a1a] mb-3 block text-base">
                        Nº do Processo
                      </Label>
                      <Input
                        id="processo"
                        type="text"
                        placeholder="Ex: 59000.123456/2024-00"
                        className="bg-white border-[#e5e7eb] h-14 text-base"
                        defaultValue="59000.987654/2023-11"
                      />
                    </div>

                    <div>
                      <Label htmlFor="normativo" className="text-[#1a1a1a] mb-3 block text-base">
                        Link do Normativo
                      </Label>
                      <Input
                        id="normativo"
                        type="url"
                        placeholder="https://..."
                        className="bg-white border-[#e5e7eb] h-14 text-base"
                        defaultValue="https://www.planalto.gov.br/ccivil_03/decreto/2001/d3692.htm"
                      />
                    </div>

                    <div>
                      <Label htmlFor="subcolegiado" className="text-[#1a1a1a] mb-3 block text-base">
                        Subcolegiado ligado ao
                      </Label>
                      <Input
                        id="subcolegiado"
                        type="text"
                        placeholder="Nome do colegiado principal"
                        className="bg-white border-[#e5e7eb] h-14 text-base"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-[#e5e7eb] px-14 py-7 flex-shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <Button
                type="button"
                onClick={handleDelete}
                className="bg-[#dc2626] hover:bg-[#b91c1c] text-white w-full sm:w-auto h-12 px-8 text-base"
              >
                Excluir Colegiado
              </Button>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="button"
                  onClick={handleDiscard}
                  variant="outline"
                  className="border-[#e5e7eb] text-[#1a1a1a] hover:bg-[#f3f4f6] w-full sm:w-auto h-12 px-8 text-base"
                >
                  Descartar alterações
                </Button>
                <Button
                  type="button"
                  onClick={handleSave}
                  className="bg-[#22c55e] hover:bg-[#16a34a] text-white w-full sm:w-auto h-12 px-8 text-base"
                >
                  Salvar alterações
                </Button>
              </div>
            </div>
          </Resizable>
        </div>
      </DialogPortal>
    </Dialog>
  );
}
