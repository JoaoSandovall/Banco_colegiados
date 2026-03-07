import { X } from 'lucide-react';
import { Dialog, DialogPortal, DialogOverlay, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface EditRepresentacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  representante: {
    id: string;
    nome: string;
  } | null;
  representacaoId: string;
}

export function EditRepresentacaoModal({ isOpen, onClose, representante, representacaoId }: EditRepresentacaoModalProps) {
  if (!representante || !isOpen) return null;

  const handleSave = () => {
    console.log('Saving changes for representacao:', representacaoId);
    onClose();
  };

  const handleDiscard = () => {
    console.log('Discarding changes');
    onClose();
  };

  const handleDelete = () => {
    console.log('Deleting representacao:', representacaoId);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-[60] bg-black/50" />
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-[900px] flex flex-col max-h-[90vh]">
            <DialogTitle className="sr-only">
              Editar Representação: {representante.nome}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Formulário para editar informações da representação
            </DialogDescription>
            
            {/* Header */}
            <div className="relative border-b border-[#e5e7eb] px-8 py-6">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-[#6b7280] hover:text-[#1a1a1a] transition-colors"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
              <h2 className="text-[#003366] text-xl pr-8">
                Editar Representação: {representante.nome}
              </h2>
            </div>

            {/* Content Body - Form */}
            <div className="flex-1 overflow-y-auto px-8 py-8">
              <div className="space-y-8">
                
                {/* Nome do Colegiado - Full width */}
                <div>
                  <Label htmlFor="nome-colegiado" className="text-[#1a1a1a] mb-2 block">
                    Nome do Colegiado
                  </Label>
                  <Input
                    id="nome-colegiado"
                    type="text"
                    className="bg-white border-[#e5e7eb] h-11"
                    defaultValue="Conselho Nacional de Recursos Hídricos"
                    readOnly
                  />
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Column 1: Informações de Status e Lotação */}
                  <div className="space-y-6">
                    <h3 className="text-[#003366]">Informações de Status e Lotação</h3>

                    <div>
                      <Label className="text-[#1a1a1a] mb-2 block">
                        Status
                      </Label>
                      <RadioGroup defaultValue="ativo" className="flex gap-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ativo" id="status-ativo" />
                          <Label htmlFor="status-ativo" className="text-[#1a1a1a] cursor-pointer">
                            Ativo
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="inativo" id="status-inativo" />
                          <Label htmlFor="status-inativo" className="text-[#1a1a1a] cursor-pointer">
                            Inativo
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="tipo-representacao" className="text-[#1a1a1a] mb-2 block">
                        Tipo de Representação
                      </Label>
                      <Select defaultValue="titular">
                        <SelectTrigger id="tipo-representacao" className="bg-white border-[#e5e7eb] h-11">
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
                      <Label htmlFor="cargo-representante" className="text-[#1a1a1a] mb-2 block">
                        Cargo do Representante
                      </Label>
                      <Input
                        id="cargo-representante"
                        type="text"
                        className="bg-[#f9fafb] border-[#e5e7eb] h-11 text-[#6b7280] cursor-not-allowed"
                        defaultValue="Diretor de Departamento"
                        readOnly
                      />
                    </div>

                    <div>
                      <Label htmlFor="secretaria-representante" className="text-[#1a1a1a] mb-2 block">
                        Secretaria do Representante
                      </Label>
                      <Input
                        id="secretaria-representante"
                        type="text"
                        className="bg-[#f9fafb] border-[#e5e7eb] h-11 text-[#6b7280] cursor-not-allowed"
                        defaultValue="Secretaria Nacional de Segurança Hídrica"
                        readOnly
                      />
                    </div>

                    <div>
                      <Label htmlFor="sigla-secretaria" className="text-[#1a1a1a] mb-2 block">
                        Sigla Secretaria
                      </Label>
                      <Input
                        id="sigla-secretaria"
                        type="text"
                        className="bg-[#f9fafb] border-[#e5e7eb] h-11 text-[#6b7280] cursor-not-allowed"
                        defaultValue="SNSH"
                        readOnly
                      />
                    </div>

                    <div>
                      <Label htmlFor="departamento-representante" className="text-[#1a1a1a] mb-2 block">
                        Departamento do Representante
                      </Label>
                      <Input
                        id="departamento-representante"
                        type="text"
                        className="bg-[#f9fafb] border-[#e5e7eb] h-11 text-[#6b7280] cursor-not-allowed"
                        defaultValue="Departamento de Políticas de Recursos Hídricos"
                        readOnly
                      />
                    </div>

                    <div>
                      <Label htmlFor="sigla-departamento" className="text-[#1a1a1a] mb-2 block">
                        Sigla Departamento
                      </Label>
                      <Input
                        id="sigla-departamento"
                        type="text"
                        className="bg-[#f9fafb] border-[#e5e7eb] h-11 text-[#6b7280] cursor-not-allowed"
                        defaultValue="DPRH"
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Column 2: Documentação e Processo */}
                  <div className="space-y-6">
                    <h3 className="text-[#003366]">Documentação e Processo</h3>

                    <div>
                      <Label htmlFor="ato-indicacao" className="text-[#1a1a1a] mb-2 block">
                        Ato de Indicação
                      </Label>
                      <Input
                        id="ato-indicacao"
                        type="text"
                        placeholder="Ex: Portaria nº 123/2024"
                        className="bg-white border-[#e5e7eb] h-11"
                        defaultValue="Portaria MIDR nº 4/6/2023"
                      />
                    </div>

                    <div>
                      <Label htmlFor="link-portaria" className="text-[#1a1a1a] mb-2 block">
                        Link da Portaria
                      </Label>
                      <Input
                        id="link-portaria"
                        type="url"
                        placeholder="https://..."
                        className="bg-white border-[#e5e7eb] h-11"
                        defaultValue="https://www.in.gov.br/portaria/2023/456"
                      />
                    </div>

                    <div>
                      <Label htmlFor="data-ato-indicacao" className="text-[#1a1a1a] mb-2 block">
                        Data do Ato de Indicação
                      </Label>
                      <Input
                        id="data-ato-indicacao"
                        type="date"
                        className="bg-white border-[#e5e7eb] h-11"
                        defaultValue="2023-06-04"
                      />
                    </div>

                    <div>
                      <Label htmlFor="numero-processo" className="text-[#1a1a1a] mb-2 block">
                        Nº do Processo
                      </Label>
                      <Input
                        id="numero-processo"
                        type="text"
                        placeholder="Ex: 59000.123456/2024-00"
                        className="bg-white border-[#e5e7eb] h-11"
                        defaultValue="59000.789012/2023-45"
                      />
                    </div>

                    <div>
                      <Label htmlFor="prazo-representacao" className="text-[#1a1a1a] mb-2 block">
                        Prazo de Representação
                      </Label>
                      <Input
                        id="prazo-representacao"
                        type="date"
                        className="bg-white border-[#e5e7eb] h-11"
                        placeholder="DD/MM/AAAA"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-[#e5e7eb] px-8 py-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <Button
                type="button"
                onClick={handleDelete}
                className="bg-[#dc2626] hover:bg-[#b91c1c] text-white h-10 px-6"
              >
                Excluir Representação
              </Button>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  onClick={handleDiscard}
                  variant="outline"
                  className="border-[#e5e7eb] text-[#1a1a1a] hover:bg-[#f3f4f6] h-10 px-6"
                >
                  Descartar alterações
                </Button>
                <Button
                  type="button"
                  onClick={handleSave}
                  className="bg-[#22c55e] hover:bg-[#16a34a] text-white h-10 px-6"
                >
                  Salvar alterações
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
}
