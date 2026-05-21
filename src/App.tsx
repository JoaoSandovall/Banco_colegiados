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

  const filtrosPadraoColegiados = {
    nomeColegiado: [] as string[],
    coordenacao: [] as string[],
    temas: [] as string[],
    status: [] as string[],
    principalSub: [] as string[],
    atuacaoMIDR: [] as string[],
    internoMinisterial: [] as string[],
    filtroEtiquetas: ''
  };
  const [colegiadosFilters, setColegiadosFilters] = useState(filtrosPadraoColegiados);
  const [activeColFilters, setActiveColFilters] = useState(filtrosPadraoColegiados);

  const filtrosPadraoRepresentantes = {
    nomeColegiado: [] as string[],
    status: [] as string[],
    nomeRepresentante: [] as string[],
    tipoRepresentacao: [] as string[],
    cceFce: [] as string[],
    cargo: [] as string[],
    secretaria: [] as string[],
    departamento: [] as string[],
    atoIndicacao: [] as string[],
    dataAtoIndicacao: [] as string[],
    numeroProcesso: [] as string[],
    filtroEtiquetas: ''
  };
  const [representantesFilters, setRepresentantesFilters] = useState(filtrosPadraoRepresentantes);
  const [activeRepFilters, setActiveRepFilters] = useState(filtrosPadraoRepresentantes);

  const fetchDadosColegiados = async () => {
    try {
      const data = await api.getColegiados();
      const mappedData = data.map((col: any) => ({ ...col, numeroRepresentantes: col.representacoes?.length || 0, tags: col.tags ? col.tags : [] }));
      setColegiados(mappedData);
    } catch (error) { console.error(error); }
  };

  const fetchDadosRepresentantes = async () => {
    try {
      const pessoasData = await api.getRepresentantes();
      setPessoas(pessoasData.map((p: any) => ({ ...p, tags: p.tags ? p.tags : [] })));
      if(api.getAllRepresentacoes) {
        const repData = await api.getAllRepresentacoes();
        setRepresentacoes(repData);
      }
    } catch (error) { console.error(error); }
  };

  useEffect(() => {
    fetchDadosColegiados(); fetchDadosRepresentantes();
  }, []);

  const handleColegiadosFilterChange = (key: string, value: any) => setColegiadosFilters(prev => ({ ...prev, [key]: value }));
  const handleColegiadosClearFilters = () => { setColegiadosFilters(filtrosPadraoColegiados); setActiveColFilters(filtrosPadraoColegiados); };
  const handleColegiadosApplyFilters = () => { setActiveColFilters(colegiadosFilters); };

  const handleColegiadoTagsChange = async (id: number, tags: TagItem[]) => {
    const colegiadoAtual = colegiados.find(c => c.id === id);
    if (!colegiadoAtual) return;
    setColegiados(prev => prev.map(col => col.id === id ? { ...col, tags } : col));
    try { await api.updateColegiado(id, { ...colegiadoAtual, tags: tags }); } catch (error) {}
  };

  const colegiadosExibidos = colegiados.filter((c: any) => {
    const f = activeColFilters;
    if (f.nomeColegiado.length > 0 && !f.nomeColegiado.includes(c.nome_colegiado)) return false;
    if (f.coordenacao.length > 0 && !f.coordenacao.includes(c.coordenacao)) return false;
    if (f.temas.length > 0 && !f.temas.includes(c.temas)) return false;
    if (f.status.length > 0 && !f.status.includes(c.status_vigencia)) return false;
    if (f.principalSub.length > 0 && !f.principalSub.includes(c.principal_subcolegiado)) return false;
    if (f.atuacaoMIDR.length > 0 && !f.atuacaoMIDR.includes(c.atuacao_midr)) return false;
    if (f.internoMinisterial.length > 0 && !f.internoMinisterial.includes(c.interno_interministerial)) return false;
    if (f.filtroEtiquetas) {
      const termoBusca = f.filtroEtiquetas.toLowerCase();
      const possuiTag = c.tags && c.tags.some((t: TagItem) => t.text.toLowerCase().includes(termoBusca));
      if (!possuiTag) return false;
    }
    return true;
  });

  const handleRepresentantesFilterChange = (key: string, value: any) => setRepresentantesFilters(prev => ({ ...prev, [key]: value }));
  const handleRepresentantesClearFilters = () => { setRepresentantesFilters(filtrosPadraoRepresentantes); setActiveRepFilters(filtrosPadraoRepresentantes); };
  const handleRepresentantesApplyFilters = () => { setActiveRepFilters(representantesFilters); };

  const handleRepresentanteTagsChange = async (id: number, tags: TagItem[]) => {
    const pAtual = pessoas.find(p => p.id === id);
    if (!pAtual) return;
    setPessoas(prev => prev.map(p => p.id === id ? { ...p, tags } : p));
    try { 
      const payload = {
        nome: pAtual.nome, status: pAtual.status || 'Ativo', cce_fce: pAtual.cce_fce || '',
        cargo: pAtual.cargo || '', secretaria: pAtual.secretaria || '', departamento: pAtual.departamento || '',
        sigla_secretaria: pAtual.sigla_secretaria || '', sigla_departamento: pAtual.sigla_departamento || '', tags: tags
      };
      
      await api.updateRepresentante(id, payload); 
    } catch (error) { console.error(error); }
  };

  const pessoasExibidas = pessoas.filter((pessoa: any) => {
    const f = activeRepFilters;
    if (f.nomeRepresentante.length > 0 && !f.nomeRepresentante.includes(pessoa.nome)) return false;
    if (f.status.length > 0 && !f.status.includes(pessoa.status || 'Ativo')) return false;
    if (f.cceFce.length > 0 && !f.cceFce.includes(pessoa.cce_fce)) return false;
    if (f.cargo.length > 0 && !f.cargo.includes(pessoa.cargo)) return false;
    if (f.secretaria.length > 0 && !f.secretaria.includes(pessoa.secretaria)) return false;
    if (f.departamento.length > 0 && !f.departamento.includes(pessoa.departamento)) return false;
    if (f.filtroEtiquetas) {
      const termoBusca = f.filtroEtiquetas.toLowerCase();
      const possuiTag = pessoa.tags && pessoa.tags.some((t: TagItem) => t.text.toLowerCase().includes(termoBusca));
      if (!possuiTag) return false;
    }
    
    const hasVinculoFilters = f.nomeColegiado.length > 0 || f.tipoRepresentacao.length > 0 || f.atoIndicacao.length > 0 || f.dataAtoIndicacao.length > 0 || f.numeroProcesso.length > 0;
    
    if (hasVinculoFilters) {
      const pReps = representacoes.filter(r => r.representante_id === pessoa.id);
      if (pReps.length === 0) return false; 
      
      const matchVinculo = pReps.some(r => {
        const c = colegiados.find(col => col.id === r.colegiado_id);
        if (f.nomeColegiado.length > 0 && (!c || !f.nomeColegiado.includes(c.nome_colegiado))) return false;
        if (f.tipoRepresentacao.length > 0 && !f.tipoRepresentacao.includes(r.tipo_representacao)) return false;
        if (f.atoIndicacao.length > 0 && !f.atoIndicacao.includes(r.ato_indicacao)) return false;
        if (f.dataAtoIndicacao.length > 0 && !f.dataAtoIndicacao.includes(r.data_ato_indicacao)) return false;
        if (f.numeroProcesso.length > 0 && !f.numeroProcesso.includes(r.numero_processo)) return false;
        return true;
      });
      if (!matchVinculo) return false;
    }
    return true;
  });

  const opcoesNomesColegiados = Array.from(new Set(colegiados.map(c => c.nome_colegiado))).filter(Boolean).sort() as string[];
  const opcoesCoordenacoes = Array.from(new Set(colegiados.map(c => c.coordenacao))).filter(Boolean).sort() as string[];
  const opcoesTemas = Array.from(new Set(colegiados.map(c => c.temas))).filter(Boolean).sort() as string[];
  const opcoesStatusCol = Array.from(new Set(colegiados.map(c => c.status_vigencia))).filter(Boolean).sort() as string[];
  const opcoesPrincipalSub = Array.from(new Set(colegiados.map(c => c.principal_subcolegiado))).filter(Boolean).sort() as string[];
  const opcoesAtuacaoMIDR = Array.from(new Set(colegiados.map(c => c.atuacao_midr))).filter(Boolean).sort() as string[];
  const opcoesInternoMin = Array.from(new Set(colegiados.map(c => c.interno_interministerial))).filter(Boolean).sort() as string[];

  const opcoesNomesRepresentantes = Array.from(new Set(pessoas.map(p => p.nome))).filter(Boolean).sort() as string[];
  const opcoesStatusRep = Array.from(new Set(pessoas.map(p => p.status || 'Ativo'))).filter(Boolean).sort() as string[];
  const opcoesCargos = Array.from(new Set(pessoas.map(p => p.cargo))).filter(Boolean).sort() as string[];
  const opcoesCceFce = Array.from(new Set(pessoas.map(p => p.cce_fce))).filter(Boolean).sort() as string[];
  const opcoesSecretarias = Array.from(new Set(pessoas.map(p => p.secretaria))).filter(Boolean).sort() as string[];
  const opcoesDepartamentos = Array.from(new Set(pessoas.map(p => p.departamento))).filter(Boolean).sort() as string[];
  
  const opcoesTiposRep = Array.from(new Set(representacoes.map(r => r.tipo_representacao))).filter(Boolean).sort() as string[];
  const opcoesAtos = Array.from(new Set(representacoes.map(r => r.ato_indicacao))).filter(Boolean).sort() as string[];
  const opcoesDatasAtos = Array.from(new Set(representacoes.map(r => r.data_ato_indicacao))).filter(Boolean).sort() as string[];
  const opcoesProcessos = Array.from(new Set(representacoes.map(r => r.numero_processo))).filter(Boolean).sort() as string[];
  
  const totalRepresentantes = pessoas.length;

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
      }} />

      <EditRepresentanteBasicoModal
        isOpen={isPessoaModalOpen} onClose={() => { setIsPessoaModalOpen(false); setEditingPessoaId(null); setEditingPessoaData(null); }}
        representanteId={editingPessoaId} initialData={editingPessoaData}
        onSave={async (data) => {
          if (!editingPessoaId) { await api.createRepresentante(data); } else { 
            await api.updateRepresentante(editingPessoaId, data); 
          }
          await fetchDadosRepresentantes(); setIsPessoaModalOpen(false);
        }}
        onDelete={async (id) => {
          try {
            await api.deleteRepresentante(id); toast.success('Representante e todos os seus vínculos foram excluídos!');
            await fetchDadosRepresentantes(); await fetchDadosColegiados(); setIsPessoaModalOpen(false);
          } catch (error: any) { toast.error(error.message || 'Erro ao excluir o representante.'); }
        }}
      />

      <ViewColegiadoModal isOpen={isViewColegiadoModalOpen} onClose={() => setIsViewColegiadoModalOpen(false)} colegiado={viewingColegiadoData} />
      <ViewRepresentanteModal isOpen={isViewRepresentanteModalOpen} onClose={() => { setIsViewRepresentanteModalOpen(false); setViewingRepresentanteData(null); }} representante={viewingRepresentanteData} />
      
      <ViewRepresentacoesModal
        isOpen={!!viewingColegiado || !!viewingPessoa} onClose={() => { setViewingColegiado(null); setViewingPessoa(null); }}
        colegiado={viewingColegiado} representante={viewingPessoa} refreshTrigger={refreshModalView} listaColegiados={colegiados}
        onOpenVinculo={(id: number) => { setEditingRepresentacaoId(null); setEditingRepresentacaoData({ colegiado_id: id }); setIsRepresentacaoModalOpen(true); }}
        onOpenVinculoPessoa={(id: number) => { setEditingRepresentacaoId(null); setEditingRepresentacaoData({ representante_id: id }); setIsRepresentacaoModalOpen(true); }}
        onEditRepresentacao={(id: number) => { setEditingRepresentacaoData(representacoes.find(r => r.id === id)); setEditingRepresentacaoId(id); setIsRepresentacaoModalOpen(true); }}
        onDeleteRepresentacao={async (id: number) => {
          try {
            await api.deleteRepresentacao(id); toast.success('Vínculo excluído com sucesso!');
            await fetchDadosRepresentantes(); await fetchDadosColegiados(); setRefreshModalView(prev => prev + 1);
          } catch (error: any) { toast.error(error.message || 'Erro ao excluir o vínculo.'); }
        }}
      />

      <EditRepresentacaoModal
        isOpen={isRepresentacaoModalOpen} onClose={() => { setIsRepresentacaoModalOpen(false); setEditingRepresentacaoId(null); setEditingRepresentacaoData(null); }}
        representacaoId={editingRepresentacaoId} initialData={editingRepresentacaoData} pessoasDisponiveis={pessoas} colegiadosDisponiveis={colegiados}
        onSave={async (data) => {
          if (!editingRepresentacaoId) { await api.createRepresentacao(data); toast.success('Vínculo criado com sucesso!'); } else { await api.updateRepresentacao(editingRepresentacaoId, data); toast.success('Vínculo atualizado!'); }
          await fetchDadosRepresentantes(); await fetchDadosColegiados(); setRefreshModalView(prev => prev + 1); setIsRepresentacaoModalOpen(false);
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
              <div className="mb-6">
                <FilterSection 
                  filters={colegiadosFilters} 
                  onFilterChange={handleColegiadosFilterChange} 
                  onClearFilters={handleColegiadosClearFilters} 
                  onApplyFilters={handleColegiadosApplyFilters} 
                  opcoesNomes={opcoesNomesColegiados}
                  opcoesCoordenacoes={opcoesCoordenacoes}
                  opcoesTemas={opcoesTemas}
                  opcoesStatus={opcoesStatusCol}
                  opcoesPrincipalSub={opcoesPrincipalSub}
                  opcoesAtuacao={opcoesAtuacaoMIDR}
                  opcoesInternoMin={opcoesInternoMin}
                />
              </div>
              <SummaryBar page="colegiados" totalColegiados={colegiadosExibidos.length} totalRepresentantes={totalRepresentantes} />
              <div className="flex justify-between items-center mb-6 mt-6"><h1 className="text-2xl font-bold">Gestão de Colegiados</h1><Button onClick={() => { setEditingColegiado(null); setIsEditModalOpen(true); }}>+ Novo Colegiado</Button></div>
              <ColegiadosTable 
                colegiados={colegiadosExibidos} 
                onEdit={(id) => { setEditingColegiado(colegiados.find(c => c.id === id)); setIsEditModalOpen(true); }} 
                onViewRepresentantes={(id) => { setViewingColegiado({ id, nome_colegiado: colegiados.find(c => c.id === id)?.nome_colegiado }); }} 
                onTagsChange={handleColegiadoTagsChange} 
                onViewColegiado={(id: number) => { setViewingColegiadoData(colegiados.find(c => c.id === id)); setIsViewColegiadoModalOpen(true); }}
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
                  opcoesCargos={opcoesCargos}
                  opcoesCceFce={opcoesCceFce}
                  opcoesStatus={opcoesStatusRep}
                  opcoesTiposRep={opcoesTiposRep}
                  opcoesAtos={opcoesAtos}
                  opcoesDatasAtos={opcoesDatasAtos}
                  opcoesProcessos={opcoesProcessos}
                />
              </div>
              <SummaryBar page="representantes" totalColegiados={colegiados.length} totalRepresentantes={pessoasExibidas.length} />
              <div className="flex justify-between items-center mb-6 mt-6"><h1 className="text-2xl font-bold">Quadro de Representantes</h1><Button onClick={() => { setEditingPessoaData(null); setEditingPessoaId(null); setIsPessoaModalOpen(true); }}>+ Novo Representante</Button></div>
              <RepresentantesTable
                representantes={pessoasExibidas.map((p: any) => ({ id: p.id, nome: p.nome, status: p.status || 'Ativo', tags: p.tags || [] }))}
                onViewRepresentante={(id: number) => { setViewingRepresentanteData(pessoas.find((p: any) => p.id === id)); setIsViewRepresentanteModalOpen(true); }}
                onEditRepresentante={(id: number) => { setEditingPessoaData(pessoas.find((p: any) => p.id === id)); setEditingPessoaId(id); setIsPessoaModalOpen(true); }}
                onViewRepresentacoes={(id: number) => { const pessoa = pessoas.find((p: any) => p.id === id); if (pessoa) setViewingPessoa({ id: pessoa.id, nome: pessoa.nome }); }}
                onTagsChange={handleRepresentanteTagsChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}