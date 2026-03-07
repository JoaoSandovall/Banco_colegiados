import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Resizable } from 're-resizable';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogOverlay, DialogPortal } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface EditRepresentanteModalProps {
  isOpen: boolean;
  onClose: () => void;
  representante: {
    id: string;
    nome: string;
  } | null;
}

export function EditRepresentanteModal({ isOpen, onClose, representante }: EditRepresentanteModalProps) {
  const [size, setSize] = useState({ width: '85vw', height: '85vh' });

  if (!representante) return null;

  const handleSave = () => {
    console.log('Saving changes for representante:', representante.id);
    onClose();
  };

  const handleDiscard = () => {
    console.log('Discarding changes');
    onClose();
  };

  const handleDelete = () => {
    console.log('Deleting representante:', representante.id);
    onClose();
  };

  const handleVincularColegiado = () => {
    console.log('Vinculando colegiado');
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
              Editar Representante: {representante.nome}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Formulário para editar informações do representante
            </DialogDescription>
            
            {/* Header */}
            <div className="bg-white border-b border-[#e5e7eb] px-14 py-8 flex-shrink-0">
              <h2 className="text-[#003366] text-2xl">
                Editar Representante: {representante.nome}
              </h2>
            </div>

            {/* Conteúdo scrollável */}
            <div className="flex-1 overflow-y-auto px-14 py-10">
              <div className="max-w-[1800px] mx-auto space-y-10">
                
                {/* Nome do Colegiado - Full width */}
                <div>
                  <Label htmlFor="nome-colegiado" className="text-[#1a1a1a] mb-3 block text-base">
                    Nome do Colegiado
                  </Label>
                  <div className="flex gap-4">
                    <Select defaultValue="cnrh">
                      <SelectTrigger id="nome-colegiado" className="bg-white border-[#e5e7eb] flex-1 h-14 text-base">
                        <SelectValue placeholder="Selecione o colegiado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cnrh">Conselho Nacional de Recursos Hídricos</SelectItem>
                        <SelectItem value="cndr">Conselho Nacional de Desenvolvimento Regional</SelectItem>
                        <SelectItem value="cbhsf">Comitê da Bacia Hidrográfica do São Francisco</SelectItem>
                        <SelectItem value="ctem">Comitê Técnico de Estudos e Monitoramento</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      onClick={handleVincularColegiado}
                      className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-6 whitespace-nowrap h-14 text-base"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Vincular à Colegiado
                    </Button>
                  </div>
                </div>

                {/* Layout de duas colunas */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-20 gap-y-10">
                  
                  {/* Coluna 1: Informações de Status e Lotação */}
                  <div className="space-y-8">
                    <h3 className="text-[#003366] text-xl mb-8">Informações de Status e Lotação</h3>

                    <div>
                      <Label className="text-[#1a1a1a] mb-3 block text-base">
                        Status
                      </Label>
                      <RadioGroup defaultValue="ativo" className="flex gap-8">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="ativo" id="status-ativo" />
                          <Label htmlFor="status-ativo" className="text-[#1a1a1a] cursor-pointer text-base">
                            Ativo
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="inativo" id="status-inativo" />
                          <Label htmlFor="status-inativo" className="text-[#1a1a1a] cursor-pointer text-base">
                            Inativo
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="tipo-representacao" className="text-[#1a1a1a] mb-3 block text-base">
                        Tipo de Representação
                      </Label>
                      <Select defaultValue="titular">
                        <SelectTrigger id="tipo-representacao" className="bg-white border-[#e5e7eb] h-14 text-base">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="titular">Titular</SelectItem>
                          <SelectItem value="suplente">Suplente</SelectItem>
                          <SelectItem value="convidado">Convidado</SelectItem>
                          <SelectItem value="observador">Observador</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="cargo-representante" className="text-[#1a1a1a] mb-3 block text-base">
                        Cargo do Representante
                      </Label>
                      <Input
                        id="cargo-representante"
                        type="text"
                        placeholder="Ex: Secretário Executivo"
                        className="bg-white border-[#e5e7eb] h-14 text-base"
                        defaultValue="Diretor de Departamento"
                      />
                    </div>

                    <div>
                      <Label htmlFor="secretaria-representante" className="text-[#1a1a1a] mb-3 block text-base">
                        Secretária do Representante
                      </Label>
                      <Select defaultValue="snsh">
                        <SelectTrigger id="secretaria-representante" className="bg-white border-[#e5e7eb] h-14 text-base">
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

                    <div>
                      <Label htmlFor="sigla-secretaria" className="text-[#1a1a1a] mb-3 block text-base">
                        Sigla Secretária
                      </Label>
                      <Input
                        id="sigla-secretaria"
                        type="text"
                        placeholder="Ex: SNSH"
                        className="bg-white border-[#e5e7eb] max-w-[350px] h-14 text-base"
                        defaultValue="SNSH"
                      />
                    </div>

                    <div>
                      <Label htmlFor="departamento-representante" className="text-[#1a1a1a] mb-3 block text-base">
                        Departamento do Representante
                      </Label>
                      <Select defaultValue="dprh">
                        <SelectTrigger id="departamento-representante" className="bg-white border-[#e5e7eb] h-14 text-base">
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

                    <div>
                      <Label htmlFor="sigla-departamento" className="text-[#1a1a1a] mb-3 block text-base">
                        Sigla Departamento
                      </Label>
                      <Input
                        id="sigla-departamento"
                        type="text"
                        placeholder="Ex: DPRH"
                        className="bg-white border-[#e5e7eb] max-w-[350px] h-14 text-base"
                        defaultValue="DPRH"
                      />
                    </div>
                  </div>

                  {/* Coluna 2: Documentação e Processo */}
                  <div className="space-y-8">
                    <h3 className="text-[#003366] text-xl mb-8">Documentação e Processo</h3>

                    <div>
                      <Label htmlFor="ato-indicacao" className="text-[#1a1a1a] mb-3 block text-base">
                        Ato de Indicação
                      </Label>
                      <Input
                        id="ato-indicacao"
                        type="text"
                        placeholder="Ex: Portaria nº 123/2024"
                        className="bg-white border-[#e5e7eb] h-14 text-base"
                        defaultValue="Portaria MIDR nº 456/2023"
                      />
                    </div>

                    <div>
                      <Label htmlFor="link-portaria" className="text-[#1a1a1a] mb-3 block text-base">
                        Link da Portaria
                      </Label>
                      <Input
                        id="link-portaria"
                        type="url"
                        placeholder="https://..."
                        className="bg-white border-[#e5e7eb] h-14 text-base"
                        defaultValue="https://www.in.gov.br/portaria/2023/456"
                      />
                    </div>

                    <div>
                      <Label htmlFor="data-ato-indicacao" className="text-[#1a1a1a] mb-3 block text-base">
                        Data do Ato de Indicação
                      </Label>
                      <Input
                        id="data-ato-indicacao"
                        type="date"
                        className="bg-white border-[#e5e7eb] h-14 text-base"
                        defaultValue="2023-08-15"
                      />
                    </div>

                    <div>
                      <Label htmlFor="numero-processo" className="text-[#1a1a1a] mb-3 block text-base">
                        Nº do Processo
                      </Label>
                      <Input
                        id="numero-processo"
                        type="text"
                        placeholder="Ex: 59000.123456/2024-00"
                        className="bg-white border-[#e5e7eb] h-14 text-base"
                        defaultValue="59000.789012/2023-45"
                      />
                    </div>
                  </div>
                </div>

                {/* Observações - Full width */}
                <div>
                  <Label htmlFor="observacoes" className="text-[#1a1a1a] mb-3 block text-base">
                    Observações
                  </Label>
                  <Textarea
                    id="observacoes"
                    placeholder="Adicione observações ou notas sobre o representante..."
                    className="min-h-[140px] resize-none border-[#e5e7eb] bg-white text-base p-4"
                    defaultValue="Representante designado em substituição ao titular anterior."
                  />
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
                Excluir Representante
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
