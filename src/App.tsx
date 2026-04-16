import { useEffect, useState } from 'react';
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
import { Menu } from 'lucide-react';
import { Button } from './components/ui/button';
import { TagItem } from './components/TagsManager';

export default function App() {
  const [activeMenuItem, setActiveMenuItem] = useState('colegiados');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const [editingColegiado, setEditingColegiado] = useState<any | null>(null);
  
  const [viewingRepresentacoes, setViewingRepresentacoes] = useState<{ id: number; nome?: string; nome_colegiado?: string } | null>(null);

  const [editingRepresentante, setEditingRepresentante] = useState<{ id: number; nome: string } | null>(null);
  
  const [colegiadosFilters, setColegiadosFilters] = useState({
    nomeColegiado: '',
    coordenacao: '',
    temas: '',
    status: 'todos',
    principalSub: 'todos',
    atuacaoMIDR: 'todos',
    internoMinisterial: 'todos',
    filtroEtiquetas: '',
  });
  const [colegiadosTags, setColegiadosTags] = useState<string[]>([]);
  
  // Filters for Representantes page
  const [representantesFilters, setRepresentantesFilters] = useState({
    nomeRepresentante: '',
    nomeColegiado: '',
    temas: '',
    status: 'todos',
    principalSub: 'todos',
    atuacaoMIDR: 'todos',
    internoMinisterial: 'todos',
    filtroEtiquetas: '',
  });
  const [representantesTags, setRepresentantesTags] = useState<string[]>([]);

  const [colegiados, setColegiados] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getColegiados();
        console.log("DADOS DO BANCO NO F5:", data);

        const mappedData = data.map((col: any) => ({
          ...col,
          numeroRepresentantes: 0,
          tags: col.tags ? col.tags : [], 
        }));
        setColegiados(mappedData);
      } catch (error) {
        console.error("Erro ao carregar banco de dados:", error);
      }
    };
    fetchData();
  }, []);

  // Mock data for Representantes page based on the screenshot with colored tags
  const [representantes, setRepresentantes] = useState<any[]>([]);

  const totalColegiados = 183;
  const totalRepresentantes = 502;

  // Colegiados filter handlers
  const handleColegiadosFilterChange = (key: string, value: string | string[]) => {
    setColegiadosFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleColegiadosClearFilters = () => {
    setColegiadosFilters({
      nomeColegiado: '',
      coordenacao: '',
      temas: '',
      status: 'todos',
      principalSub: 'todos',
      atuacaoMIDR: 'todos',
      internoMinisterial: 'todos',
      filtroEtiquetas: '',
    });
    setColegiadosTags([]);
  };

  const handleColegiadosApplyFilters = () => {
    console.log('Applying colegiados filters:', colegiadosFilters);
  };

  const handleColegiadosRemoveTag = (tag: string) => {
    setColegiadosTags(colegiadosTags.filter(t => t !== tag));
  };

  const handleColegiadoTagsChange = async (id: number, tags: TagItem[]) => {
    const colegiadoAtual = colegiados.find(c => c.id === id);
    if (!colegiadoAtual) return;

    const { numeroRepresentantes, ...dadosLimpos } = colegiadoAtual;
    
    const colegiadoAtualizado = { ...dadosLimpos, tags: tags };

    setColegiados(prev => prev.map(col => col.id === id ? { ...col, tags } : col));

    try {
      console.log("ENVIANDO PARA O BANCO:", colegiadoAtualizado);
      await api.updateColegiado(id, { ...colegiadoAtual, tags: tags });
    } catch (error) {
      console.error("Erro no PUT das etiquetas:", error);
      alert("A etiqueta não foi salva no banco! Abra o F12 para ver o erro.");
    }
  };

  const handleRepresentantesFilterChange = (key: string, value: string | string[]) => {
    setRepresentantesFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleRepresentantesClearFilters = () => {
    setRepresentantesFilters({
      nomeRepresentante: '',
      nomeColegiado: '',
      temas: '',
      status: 'todos',
      principalSub: 'todos',
      atuacaoMIDR: 'todos',
      internoMinisterial: 'todos',
      filtroEtiquetas: '',
    });
    setRepresentantesTags([]);
  };

  const handleRepresentantesApplyFilters = () => {
    console.log('Applying representantes filters:', representantesFilters);
  };

  const handleRepresentantesRemoveTag = (tag: string) => {
    setRepresentantesTags(representantesTags.filter(t => t !== tag));
  };

  const handleRepresentanteTagsChange = (id: string, tags: TagItem[]) => {
    setRepresentantes(prev => 
      prev.map(rep => rep.id === id ? { ...rep, tags } : rep)
    );
  };

  const handleOpenNewColegiado = () => {
    setEditingColegiado(null);
    setIsEditModalOpen(true);
  };

  const handleEditColegiado = (id: number) => {
    const colegiado = colegiados.find(c => c.id === id);
    if (colegiado) {    
      setEditingColegiado(colegiado);
      setIsEditModalOpen(true);
    }
  };

  const handleDeleteColegiado = async (id: number) => {
    try {
      await api.deleteColegiado(id);
      setColegiados(prev => prev.filter(c => c.id !== id));
      alert("Colegiado excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir colegiado:", error);
      alert("Ocorreu um erro ao excluir o colegiado.");
    }
  };

  const handleViewRepresentantes = (id: number) => {
    const colegiado = colegiados.find(c => c.id === id);
    if (colegiado) {
      setViewingRepresentacoes({ id: colegiado.id, nome_colegiado: colegiado.nome_colegiado });
    }
  };

  const handleViewRepresentacoes = (id: string) => {
    const representante = representantes.find(r => r.id === id);
    if (representante) {
      setViewingRepresentacoes({ id: parseInt(id), nome: representante.nome });
    }
  };

  const handleEditRepresentante = (id: string) => {
    const representante = representantes.find(r => r.id === id);
    if (representante) {
      setEditingRepresentante({ id: representante.id, nome: representante.nome });
    }
  };

  const getPageTitle = () => {
    switch (activeMenuItem) {
      case 'colegiados':
        return 'Colegiados';
      case 'representantes':
        return 'Representantes';
      case 'area-dados':
        return 'Área de dados';
      default:
        return 'Colegiados';
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f3f4f6]">
  
      <EditColegiadoModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        onSave={() => {
        
          api.getColegiados().then(data => setColegiados(data));
          setIsEditModalOpen(false);
        }} 
        colegiado={editingColegiado}
        listaColegiados={colegiados}
      />

      <ViewRepresentacoesModal
        isOpen={!!viewingRepresentacoes}
        onClose={() => setViewingRepresentacoes(null)}
        colegiado={viewingRepresentacoes && viewingRepresentacoes.nome_colegiado ? viewingRepresentacoes : null}
        representante={viewingRepresentacoes && viewingRepresentacoes.nome ? viewingRepresentacoes : null}
      />

      {/* Edit Representante Basico Modal */}
      <EditRepresentanteBasicoModal
        isOpen={!!editingRepresentante}
        onClose={() => setEditingRepresentante(null)}
        representante={editingRepresentante}
      />

      {/* Sidebar */}
      <Sidebar 
        activeItem={activeMenuItem} 
        onItemClick={(item) => {
          setActiveMenuItem(item);
          setMobileMenuOpen(false);
        }}
        mobileMenuOpen={mobileMenuOpen}
        onCloseMobileMenu={() => setMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-[#003366] text-white py-4 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-white hover:bg-white/10 p-2 rounded"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-white">{getPageTitle()}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-sm">JV</span>
            </div>
            <span className="text-sm hidden sm:inline">João Veras</span>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-4 md:p-8">
          {activeMenuItem === 'colegiados' && (
            <>
              {/* Filters */}
              <div className="mb-6">
                <FilterSection
                  filters={colegiadosFilters}
                  onFilterChange={handleColegiadosFilterChange}
                  onClearFilters={handleColegiadosClearFilters}
                  onApplyFilters={handleColegiadosApplyFilters}
                  tags={colegiadosTags}
                  onRemoveTag={handleColegiadosRemoveTag}
                />
              </div>

              {/* Summary */}
              <SummaryBar 
                page="colegiados"
                totalColegiados={totalColegiados}
                totalRepresentantes={totalRepresentantes}
              />

              {/* Table */}

              <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Gestão de Colegiados</h1>
              {/* Este é o botão que abre o Modal */}
              <Button onClick={handleOpenNewColegiado}>
                + Novo Colegiado
              </Button>
            </div>

              <div className="mt-6">
                <ColegiadosTable
                  colegiados={colegiados}
                  onEdit={handleEditColegiado}
                  onViewRepresentantes={handleViewRepresentantes}
                  onTagsChange={handleColegiadoTagsChange}
                  onDelete={handleDeleteColegiado}
                />
              </div>
            </>
          )}

          {activeMenuItem === 'representantes' && (
            <>
              {/* Filters */}
              <div className="mb-6">
                <RepresentantesFilterSection
                  filters={representantesFilters}
                  onFilterChange={handleRepresentantesFilterChange}
                  onClearFilters={handleRepresentantesClearFilters}
                  onApplyFilters={handleRepresentantesApplyFilters}
                  tags={representantesTags}
                  onRemoveTag={handleRepresentantesRemoveTag}
                />
              </div>

              {/* Summary */}
              <SummaryBar 
                page="representantes"
                totalColegiados={totalColegiados}
                totalRepresentantes={totalRepresentantes}
              />

              {/* Table */}
              <div className="mt-6">
                <RepresentantesTable
                  representantes={representantes}
                  onViewRepresentacoes={handleViewRepresentacoes}
                  onEditRepresentante={handleEditRepresentante}
                  onTagsChange={handleRepresentanteTagsChange}
                />
              </div>
            </>
          )}

          {activeMenuItem === 'area-dados' && (
            <div className="flex items-center justify-center h-64">
              <p className="text-[#6b7280]">Área de dados em desenvolvimento</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}