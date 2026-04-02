import { useEffect, useState } from 'react';
import { api } from './services/api';
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
import { TagItem } from './components/TagsManager';

export default function App() {
  const [activeMenuItem, setActiveMenuItem] = useState('colegiados');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Modal state for editing colegiado
  const [editingColegiado, setEditingColegiado] = useState<{ id: string; nome: string } | null>(null);
  
  // Modal state for viewing representacoes
  const [viewingRepresentacoes, setViewingRepresentacoes] = useState<{ id: string; nome: string } | null>(null);
  
  // Modal state for editing representante basico
  const [editingRepresentante, setEditingRepresentante] = useState<{ id: string; nome: string } | null>(null);
  
  // Filters for Colegiados page
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
      setColegiados(data); // Agora a tabela vai mostrar o que vem do Python
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

  const handleColegiadoTagsChange = (id: string, tags: TagItem[]) => {
    setColegiados(prev => 
      prev.map(col => col.id === id ? { ...col, tags } : col)
    );
  };

  // Representantes filter handlers
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

  // Table action handlers
  const handleEditColegiado = (id: string) => {
    const colegiado = colegiados.find(c => c.id === id);
    if (colegiado) {
      setEditingColegiado({ id: colegiado.id, nome: colegiado.nome });
    }
  };

  const handleViewRepresentantes = (id: string) => {
    console.log('Viewing representantes for colegiado:', id);
  };

  const handleViewRepresentacoes = (id: string) => {
    const representante = representantes.find(r => r.id === id);
    if (representante) {
      setViewingRepresentacoes({ id: representante.id, nome: representante.nome });
    }
  };

  const handleEditRepresentante = (id: string) => {
    const representante = representantes.find(r => r.id === id);
    if (representante) {
      setEditingRepresentante({ id: representante.id, nome: representante.nome });
    }
  };

  // Get page title based on active menu item
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
      {/* Edit Colegiado Modal */}
      <EditColegiadoModal
        isOpen={!!editingColegiado}
        onClose={() => setEditingColegiado(null)}
        colegiado={editingColegiado}
      />

      {/* View Representacoes Modal */}
      <ViewRepresentacoesModal
        isOpen={!!viewingRepresentacoes}
        onClose={() => setViewingRepresentacoes(null)}
        representante={viewingRepresentacoes}
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
              <div className="mt-6">
                <ColegiadosTable
                  colegiados={colegiados}
                  onEdit={handleEditColegiado}
                  onViewRepresentantes={handleViewRepresentantes}
                  onTagsChange={handleColegiadoTagsChange}
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