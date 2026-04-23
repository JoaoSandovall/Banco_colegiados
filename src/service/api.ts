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
  getColegiados: fetchColegiados,

  createColegiado: async (data: any) => {
    const response = await fetch(`${API_URL}/colegiados/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Erro ao salvar no banco");
    }
    
    return response.json();
  },

  updateColegiado: async (id: number, data: any) => {
    const response = await fetch(`${API_URL}/colegiados/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Erro ao atualizar no banco");
    }
    return response.json();
  },
  
  deleteColegiado: async (id: number) => {
    const response = await fetch(`${API_URL}/colegiados/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao excluir o colegiado");
    return response.json();
  }
};

export default api;