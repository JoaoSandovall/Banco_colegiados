const API_URL = "http://127.0.0.1:8000";

const api = {
  getColegiados: async () => {
    const response = await fetch(`${API_URL}/colegiados`);
    if (!response.ok) throw new Error("Erro ao buscar dados do servidor");
    return response.json();
  },

  createColegiado: async (data: any) => {
    const response = await fetch(`${API_URL}/colegiados`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erro ao salvar no banco");
    return response.json();
  }
};

export default api;
