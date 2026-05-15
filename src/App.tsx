import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import api from './service/api';
import { Sidebar } from './components/Sidebar';
import { FilterSection } from './components/FilterSection';
import { RepresentantesFilterSection } from './components/RepresentantesFilterSection';
import { SummaryBar } from './components/SummaryBar';
import { ColegiadosTable } from './components/ColegiadosTable';
import { RepresentantesTable } from './components/RepresentantesTable';
import { EditColegiadoModal } from './components/EditColegiadoModal';
import { ViewRepresentacoesModal } from './components/ViewRepresentacoesModal';
import { EditRepresentanteBasicoModal } from './components/EditRepresentanteBasicoModal';
import { EditRepresentacaoModal } from './components/EditRepresentacaoModal';
import { ViewRepresentanteModal } from './components/ViewRepresentanteModal';
import { Menu } from 'lucide-react';
import { Button } from './components/ui/button';
import { TagItem } from './components/TagsManager';
import { ViewColegiadoModal } from './components/ViewColegiadoModal';

export default function App() {
  const [isViewColegiadoModalOpen, setIsViewColegiadoModalOpen] = useState(false);
  const [viewingColegiadoData, setViewingColegiadoData] = useState<any | null>(null);

  const [activeMenuItem, setActiveMenuItem] = useState('colegiados');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingColegiado, setEditingColegiado] = useState<any | null>(null);
  const [colegiados, setColegiados] = useState<any[]>([]);
  
  const [representacoes, setRepresentacoes] = useState<any[]>([]);
  const [pessoas, setPessoas] = useState<any[]>([]); 
  
  const [isPessoaModalOpen, setIsPessoaModalOpen] = useState(false);
  const [editingPessoaId, setEditingPessoaId] = useState<number | null>(null);
  const [editingPessoaData, setEditingPessoaData] = useState<any | null>(null);

  const [isViewRepresentanteModalOpen, setIsViewRepresentanteModalOpen] = useState(false);
  const [viewingRepresentanteData, setViewingRepresentanteData] = useState<any | null>(null);
  
  const [isRepresentacaoModalOpen, setIsRepresentacaoModalOpen] = useState(false);
  const [editingRepresentacaoId, setEditingRepresentacaoId] = useState<number | null>(null);
  const [editingRepresentacaoData, setEditingRepresentacaoData] = useState<any | null>(null);

  const [viewingColegiado, setViewingColegiado] = useState<{ id: number; nome_colegiado?: string } | null>(null);
  const [viewingPessoa, setViewingPessoa] = useState<{ id: number; nome?: string } | null>(null);
  
  const [refreshModalView, setRefreshModalView] = useState(0);

  const [colegiadosFilters, setColegiadosFilters] = useState({
    nomeColegiado: '', coordenacao: '', temas: '', status: 'todos', principalSub: 'todos', atuacaoMIDR: 'todos', internoMinisterial: 'todos', filtroEtiquetas: '',
  });
  const [colegiadosTags, setColegiadosTags] = useState<string[]>([]);
  
  const filtrosPadraoRepresentantes = {
    nomeColegiado: '',
    status: 'todos',
    nomeRepresentante: '',
    tipoRepresentacao: 'todos',
    cceFce: '',
    cargo: '',
    secretaria: '',
    departamento: '',
    atoIndicacao: '',
    dataAtoIndicacao: '',
    numeroProcesso: ''
  };
  const [representantesFilters, setRepresentantesFilters] = useState(filtrosPadraoRepresentantes);
  const [activeRepFilters, setActiveRepFilters] = useState(filtrosPadraoRepresentantes);
  const [representantesTags, setRepresentantesTags] = useState<string[]>([]);

  const fetchDadosColegiados = async (filtros = {}) => {
    try {
      const data = await api.getColegiados(filtros);
      const mappedData = data.map((col: any) => ({ ...col, numeroRepresentantes: col.representacoes?.length || 0, tags: col.tags ? col.tags : [] }));
      setColegiados(mappedData);
    } catch (error) { console.error(error); }
  };

  const fetchDadosRepresentantes = async () => {
    try {
      const pessoasData = await api.getRepresentantes();
      setPessoas(pessoasData);
      if(api.getAllRepresentacoes) {
        const repData = await api.getAllRepresentacoes();
        setRepresentacoes(repData);
      }
    } catch (error) { console.error(error); }
  };

  useEffect(() => {
    fetchDadosColegiados(); fetchDadosRepresentantes();
  }, []);

  const totalColegiados = colegiados.length;
  const totalRepresentantes = representacoes.length;

  const handleColegiadosFilterChange = (key: string, value: string | string[]) => setColegiadosFilters(prev => ({ ...prev, [key]: value }));
  const handleColegiadosClearFilters = () => {
    const vazios = { nomeColegiado: '', coordenacao: '', temas: '', status: 'todos', principalSub: 'todos', atuacaoMIDR: 'todos', internoMinisterial: 'todos', filtroEtiquetas: '' };
    setColegiadosFilters(vazios); setColegiadosTags([]); fetchDadosColegiados(vazios);
  };
  const handleColegiadosApplyFilters = () => fetchDadosColegiados(colegiadosFilters);
  const handleColegiadosRemoveTag = (tag: string) => setColegiadosTags(colegiadosTags.filter(t => t !== tag));

  const handleColegiadoTagsChange = async (id: number, tags: TagItem[]) => {
    const colegiadoAtual = colegiados.find(c => c.id === id);
    if (!colegiadoAtual) return;
    setColegiados(prev => prev.map(col => col.id === id ? { ...col, tags } : col));
    try { await api.updateColegiado(id, { ...colegiadoAtual, tags: tags }); } catch (error) {}
  };

  const handleRepresentantesFilterChange = (key: string, value: string | string[]) => setRepresentantesFilters(prev => ({ ...prev, [key]: value }));
  const handleRepresentantesClearFilters = () => {
    setRepresentantesFilters(filtrosPadraoRepresentantes);
    setActiveRepFilters(filtrosPadraoRepresentantes);
    setRepresentantesTags([]);
  };

  const handleRepresentantesApplyFilters = () => {
    setActiveRepFilters(representantesFilters);
  };

  const handleRepresentantesRemoveTag = (tag: string) => setRepresentantesTags(representantesTags.filter(t => t !== tag));

  const pessoasExibidas = pessoas.filter((pessoa: any) => {
    const f = activeRepFilters;
    
    if (f.nomeRepresentante && !pessoa.nome?.toLowerCase().includes(f.nomeRepresentante.toLowerCase())) return false;
    if (f.status !== 'todos' && (pessoa.status || 'Ativo').toLowerCase() !== f.status.toLowerCase()) return false;
    if (f.cceFce && !pessoa.cce_fce?.toLowerCase().includes(f.cceFce.toLowerCase())) return false;
    if (f.cargo && !pessoa.cargo?.toLowerCase().includes(f.cargo.toLowerCase())) return false;
    if (f.secretaria && !pessoa.secretaria?.toLowerCase().includes(f.secretaria.toLowerCase())) return false;
    if (f.departamento && !pessoa.departamento?.toLowerCase().includes(f.departamento.toLowerCase())) return false;
    
    const hasVinculoFilters = f.nomeColegiado || f.tipoRepresentacao !== 'todos' || f.atoIndicacao || f.dataAtoIndicacao || f.numeroProcesso;
    
    if (hasVinculoFilters) {
      const pReps = representacoes.filter(r => r.representante_id === pessoa.id);
      
      if (pReps.length === 0) return false; 
      
      const matchVinculo = pReps.some(r => {
        const c = colegiados.find(col => col.id === r.colegiado_id);
        if (f.nomeColegiado && (!c || !c.nome_colegiado?.toLowerCase().includes(f.nomeColegiado.toLowerCase()))) return false;
        if (f.tipoRepresentacao !== 'todos' && r.tipo_representacao?.toLowerCase() !== f.tipoRepresentacao.toLowerCase()) return false;
        if (f.atoIndicacao && !r.ato_indicacao?.toLowerCase().includes(f.atoIndicacao.toLowerCase())) return false;
        if (f.dataAtoIndicacao && r.data_ato_indicacao !== f.dataAtoIndicacao) return false;
        if (f.numeroProcesso && !r.numero_processo?.toLowerCase().includes(f.numeroProcesso.toLowerCase())) return false;
        return true;
      });
      
      if (!matchVinculo) return false;
    }
    
    return true;
  });

  const opcoesNomesRepresentantes = Array.from(new Set(pessoas.map((p: any) => p.nome))).filter(Boolean) as string[];
  const opcoesNomesColegiados = Array.from(new Set(colegiados.map((c: any) => c.nome_colegiado))).filter(Boolean) as string[];
  const opcoesSecretarias = Array.from(new Set(pessoas.map((p: any) => p.secretaria))).filter(Boolean) as string[];
  const opcoesDepartamentos = Array.from(new Set(pessoas.map((p: any) => p.departamento))).filter(Boolean) as string[];

  return (
    <div className="flex min-h-screen bg-[#f3f4f6]">
      <Toaster position="top-right" richColors />
      
      <EditColegiadoModal 
        isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} 
        onSave={async () => { await fetchDadosColegiados(); setIsEditModalOpen(false); }} 
        colegiado={editingColegiado} listaColegiados={colegiados}
        onDelete={async (id) => {
        if (window.confirm("Excluir este colegiado apagará todos os vínculos de representantes. Confirmar?")) {
          await api.deleteColegiado(id);
          fetchDadosColegiados();
          setIsEditModalOpen(false);
        }
  }}
      />

      <EditRepresentanteBasicoModal
        isOpen={isPessoaModalOpen} onClose={() => { setIsPessoaModalOpen(false); setEditingPessoaId(null); setEditingPessoaData(null); }}
        representanteId={editingPessoaId} initialData={editingPessoaData}
        onSave={async (data) => {
          if (!editingPessoaId) { await api.createRepresentante(data); } 
          else { 
            // @ts-ignore
            await api.updateRepresentante(editingPessoaId, data); 
          }
          await fetchDadosRepresentantes(); setIsPessoaModalOpen(false);
        }}
        onDelete={async (id) => {
          try {
            await api.deleteRepresentante(id);
            toast.success('Representante e todos os seus vínculos foram excluídos!');
            await fetchDadosRepresentantes();
            await fetchDadosColegiados();
            setIsPessoaModalOpen(false);
          } catch (error: any) {
            toast.error(error.message || 'Erro ao excluir o representante.');
          }
        }}
      />

      <ViewColegiadoModal 
        isOpen={isViewColegiadoModalOpen} 
        onClose={() => setIsViewColegiadoModalOpen(false)} 
        colegiado={viewingColegiadoData} 
      />

      <ViewRepresentanteModal
        isOpen={isViewRepresentanteModalOpen}
        onClose={() => { setIsViewRepresentanteModalOpen(false); setViewingRepresentanteData(null); }}
        representante={viewingRepresentanteData}
      />
      
      <ViewRepresentacoesModal
        isOpen={!!viewingColegiado || !!viewingPessoa} 
        onClose={() => { setViewingColegiado(null); setViewingPessoa(null); }}
        colegiado={viewingColegiado}
        representante={viewingPessoa}
        refreshTrigger={refreshModalView} 
        listaColegiados={colegiados}
        onOpenVinculo={(id: number) => { 
          setEditingRepresentacaoId(null);
          setEditingRepresentacaoData({ colegiado_id: id });
          setIsRepresentacaoModalOpen(true);
        }}
        onOpenVinculoPessoa={(id: number) => { 
          setEditingRepresentacaoId(null);
          setEditingRepresentacaoData({ representante_id: id });
          setIsRepresentacaoModalOpen(true);
        }}
        onEditRepresentacao={(id: number) => { 
          setEditingRepresentacaoData(representacoes.find(r => r.id === id));
          setEditingRepresentacaoId(id);
          setIsRepresentacaoModalOpen(true); 
        }}
        onDeleteRepresentacao={async (id: number) => {
          try {
            await api.deleteRepresentacao(id);
            toast.success('Vínculo excluído com sucesso!');
            await fetchDadosRepresentantes();
            await fetchDadosColegiados();
            setRefreshModalView(prev => prev + 1);
          } catch (error: any) {
            toast.error(error.message || 'Erro ao excluir o vínculo.');
          }
        }}
      />

      <EditRepresentacaoModal
        isOpen={isRepresentacaoModalOpen} onClose={() => { setIsRepresentacaoModalOpen(false); setEditingRepresentacaoId(null); setEditingRepresentacaoData(null); }}
        representacaoId={editingRepresentacaoId} initialData={editingRepresentacaoData}
        pessoasDisponiveis={pessoas} colegiadosDisponiveis={colegiados}
        onSave={async (data) => {
          if (!editingRepresentacaoId) { 
            await api.createRepresentacao(data); 
            toast.success('Vínculo criado com sucesso!');
          } else { 
            await api.updateRepresentacao(editingRepresentacaoId, data); 
            toast.success('Vínculo atualizado!');
          }
          await fetchDadosRepresentantes(); 
          await fetchDadosColegiados(); 
          setRefreshModalView(prev => prev + 1);
          setIsRepresentacaoModalOpen(false);
        }}
      />

      <Sidebar activeItem={activeMenuItem} onItemClick={(item) => { setActiveMenuItem(item); setMobileMenuOpen(false); }} mobileMenuOpen={mobileMenuOpen} onCloseMobileMenu={() => setMobileMenuOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-[#003366] text-white py-4 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3"><button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-white hover:bg-white/10 p-2"><Menu size={24} /></button><h1 className="text-white">{activeMenuItem === 'colegiados' ? 'Colegiados' : activeMenuItem === 'representantes' ? 'Representantes' : 'Área de dados'}</h1></div>
        </header>

        <div className="flex-1 p-4 md:p-8">
          {activeMenuItem === 'colegiados' && (
            <>
              <div className="mb-6"><FilterSection filters={colegiadosFilters} onFilterChange={handleColegiadosFilterChange} onClearFilters={handleColegiadosClearFilters} onApplyFilters={handleColegiadosApplyFilters} tags={colegiadosTags} onRemoveTag={handleColegiadosRemoveTag} /></div>
              <SummaryBar page="colegiados" totalColegiados={totalColegiados} totalRepresentantes={totalRepresentantes} />
              <div className="flex justify-between items-center mb-6 mt-6"><h1 className="text-2xl font-bold">Gestão de Colegiados</h1><Button onClick={() => { setEditingColegiado(null); setIsEditModalOpen(true); }}>+ Novo Colegiado</Button></div>
              <ColegiadosTable 
                colegiados={colegiados} 
                onEdit={(id) => { 
                  setEditingColegiado(colegiados.find(c => c.id === id)); 
                  setIsEditModalOpen(true); 
                }} 
                onViewRepresentantes={(id) => {
                  setViewingColegiado({ 
                    id, 
                    nome_colegiado: colegiados.find(c => c.id === id)?.nome_colegiado 
                  });
                }} 
                onTagsChange={handleColegiadoTagsChange} 
                onViewColegiado={(id: number) => {
                  setViewingColegiadoData(colegiados.find(c => c.id === id));
                  setIsViewColegiadoModalOpen(true);
                }}
              />
            </>
          )}

          {activeMenuItem === 'representantes' && (
            <>
              <div className="mb-6">
                <RepresentantesFilterSection 
                  filters={representantesFilters} 
                  onFilterChange={handleRepresentantesFilterChange} 
                  onClearFilters={handleRepresentantesClearFilters} 
                  onApplyFilters={handleRepresentantesApplyFilters}
                  opcoesRepresentantes={opcoesNomesRepresentantes}
                  opcoesColegiados={opcoesNomesColegiados}
                  opcoesSecretarias={opcoesSecretarias}
                  opcoesDepartamentos={opcoesDepartamentos}
                />
                
              </div>
              <SummaryBar page="representantes" totalColegiados={totalColegiados} totalRepresentantes={pessoasExibidas.length} />
              <div className="flex justify-between items-center mb-6 mt-6"><h1 className="text-2xl font-bold">Quadro de Representantes</h1><Button onClick={() => { setEditingPessoaData(null); setEditingPessoaId(null); setIsPessoaModalOpen(true); }}>+ Novo Representante</Button></div>
              <RepresentantesTable
                representantes={pessoasExibidas.map((p: any) => ({
                  id: p.id,
                  nome: p.nome,
                  status: p.status || 'Ativo',
                  tags: p.tags || []
                }))}
                
                onViewRepresentante={(id: number) => {
                  setViewingRepresentanteData(pessoas.find((p: any) => p.id === id));
                  setIsViewRepresentanteModalOpen(true);
                }}

                onEditRepresentante={(id: number) => { 
                  setEditingPessoaData(pessoas.find((p: any) => p.id === id)); 
                  setEditingPessoaId(id); 
                  setIsPessoaModalOpen(true); 
                }}
                
                onViewRepresentacoes={(id: number) => {
                  const pessoa = pessoas.find((p: any) => p.id === id);
                  if (pessoa) setViewingPessoa({ id: pessoa.id, nome: pessoa.nome });
                }}
                
                onTagsChange={(id: number, tags: TagItem[]) => { console.log(id, tags); }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}