import { Edit, X } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogPortal, DialogOverlay, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { EditRepresentacaoModal } from './EditRepresentacaoModal';

interface ViewRepresentacoesModalProps {
  isOpen: boolean;
  onClose: () => void;
  representante: {
    id: string;
    nome: string;
  } | null;
}

// Dados mockados de representações
const mockRepresentacoes = [
  {
    id: '1',
    colegiadoNome: 'Conselho Nacional de Recursos Hídricos',
    tipo: 'Titular',
    status: 'Ativo',
  },
  {
    id: '2',
    colegiadoNome: 'Comitê da Bacia Hidrográfica do São Francisco',
    tipo: 'Suplente',
    status: 'Ativo',
  },
  {
    id: '3',
    colegiadoNome: 'Conselho Nacional de Desenvolvimento Regional',
    tipo: 'Titular',
    status: 'Inativo',
  },
];

export function ViewRepresentacoesModal({ isOpen, onClose, representante }: ViewRepresentacoesModalProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRepresentacaoId, setSelectedRepresentacaoId] = useState<string>('');

  if (!representante) return null;

  const handleEditRepresentacao = (representacaoId: string) => {
    setSelectedRepresentacaoId(representacaoId);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedRepresentacaoId('');
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 z-50 bg-black/50" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-[800px] flex flex-col max-h-[90vh]">
              <DialogTitle className="sr-only">
                Representações de: {representante.nome}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Lista de colegiados onde este representante atua
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
                  Representações de: {representante.nome}
                </h2>
                <p className="text-[#6b7280] text-sm mt-1">
                  Lista de colegiados onde este representante atua
                </p>
              </div>

              {/* Content Body - Table */}
              <div className="flex-1 overflow-y-auto px-8 py-6">
                <div className="border border-[#e5e7eb] rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-[#f9fafb] hover:bg-[#f9fafb]">
                        <TableHead className="text-[#003366] h-12 px-4">
                          Nome do Colegiado
                        </TableHead>
                        <TableHead className="text-[#003366] h-12 px-4 w-[180px]">
                          Tipo de Representação
                        </TableHead>
                        <TableHead className="text-[#003366] h-12 px-4 w-[100px]">
                          Status
                        </TableHead>
                        <TableHead className="text-[#003366] h-12 px-4 w-[100px] text-right">
                          Ações
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockRepresentacoes.map((representacao) => (
                        <TableRow 
                          key={representacao.id}
                          className="hover:bg-[#f9fafb] transition-colors"
                        >
                          <TableCell className="py-3.5 px-4">
                            <span className="text-[#1a1a1a]">
                              {representacao.colegiadoNome}
                            </span>
                          </TableCell>
                          <TableCell className="py-3.5 px-4">
                            <span className="text-[#1a1a1a]">
                              {representacao.tipo}
                            </span>
                          </TableCell>
                          <TableCell className="py-3.5 px-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${
                              representacao.status === 'Ativo' 
                                ? 'bg-[#dcfce7] text-[#166534]' 
                                : 'bg-[#fee2e2] text-[#991b1b]'
                            }`}>
                              {representacao.status}
                            </span>
                          </TableCell>
                          <TableCell className="py-3.5 px-4 text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditRepresentacao(representacao.id)}
                              className="border-[#d1d5db] text-[#1a1a1a] hover:bg-[#f3f4f6] hover:text-[#003366] whitespace-nowrap h-8 px-3"
                            >
                              <Edit size={14} className="mr-1.5" />
                              Editar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-[#e5e7eb] px-8 py-5 flex justify-end">
                <Button
                  onClick={onClose}
                  className="bg-[#003366] hover:bg-[#002244] text-white h-10 px-6"
                >
                  Fechar
                </Button>
              </div>
            </div>
          </div>
        </DialogPortal>
      </Dialog>

      {/* Modal de Edição de Representação */}
      <EditRepresentacaoModal
        isOpen={editModalOpen}
        onClose={handleCloseEditModal}
        representante={representante}
        representacaoId={selectedRepresentacaoId}
      />
    </>
  );
}
