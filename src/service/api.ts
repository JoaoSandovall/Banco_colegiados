const API_URL = "http://127.0.0.1:8000";

export interface ColegiadoFilters {
  nomeColegiado?: string;
  coordenacao?: string;
  temas?: string;
  status?: string;
  principalSub?: string;
  atuacaoMIDR?: string;
  internoMinisterial?: string;
  filtroEtiquetas?: string;
}

export const fetchColegiados = async (filters: any = {}) => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== 'todos' && value !== '') {
      params.append(key, String(value));
    }
  });

  const queryString = params.toString();
  const url = queryString ? `${API_URL}/colegiados/?${queryString}` : `${API_URL}/colegiados/`;
  
  const response = await fetch(url);
  if (!response.ok) throw new Error("Erro ao buscar dados do servidor com filtros");
  return response.json();
};

const api = {
  // --- COLEGIADOS ---
  getColegiados: fetchColegiados,

  createColegiado: async (data: any) => {
    const response = await fetch(`${API_URL}/colegiados/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erro ao salvar no banco");
    return response.json();
  },

  updateColegiado: async (id: number, data: any) => {
    const response = await fetch(`${API_URL}/colegiados/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erro ao atualizar no banco");
    return response.json();
  },
  
  deleteColegiado: async (id: number) => {
    const response = await fetch(`${API_URL}/colegiados/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao excluir o colegiado");
    return response.json();
  },

  getRepresentantes: async () => {
    const response = await fetch(`${API_URL}/representantes/`);
    if (!response.ok) throw new Error("Erro ao buscar representantes");
    return response.json();
  },

  createRepresentante: async (data: any) => {
    const response = await fetch(`${API_URL}/representantes/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Erro ao criar representante");
    }
    return response.json();
  },

  getRepresentacoesPorColegiado: async (colegiadoId: number) => {
    const response = await fetch(`${API_URL}/colegiados/${colegiadoId}/representacoes/`);
    if (!response.ok) throw new Error("Erro ao buscar representações do colegiado");
    return response.json();
  },

  createRepresentacao: async (data: any) => {
    const response = await fetch(`${API_URL}/representacoes/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Erro ao vincular representante");
    }
    return response.json();
  },

  getAllRepresentacoes: async () => {
    const response = await fetch(`${API_URL}/representacoes/`);
    if (!response.ok) throw new Error("Erro ao buscar todas as representações");
    return response.json();
  },

  updateRepresentante: async (id: number, data: any) => {
    const response = await fetch(`${API_URL}/representantes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erro ao atualizar representante");
    return response.json();
  },

  updateRepresentacao: async (id: number, data: any) => {
    const response = await fetch(`${API_URL}/representacoes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erro ao atualizar vínculo");
    return response.json();
  },

  deleteRepresentante: async (id: number) => {
    const response = await fetch(`${API_URL}/representantes/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao excluir representante.');
    return response.json();
  },

  deleteRepresentacao: async (id: number) => {
    const response = await fetch(`${API_URL}/representacoes/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao excluir vínculo.');
    return response.json();
  },

};
export default api;