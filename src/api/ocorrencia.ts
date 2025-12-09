import API_BASE_URL from './config';

export async function getOcorrencias(): Promise<any[]> {
  const res = await fetch(`${API_BASE_URL}/ocorrencia`);
  if (!res.ok) throw new Error(`Status ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data : data?.data ?? [];
}

export async function getOcorrenciaById(id: string): Promise<any> {
  const res = await fetch(`${API_BASE_URL}/ocorrencia/${id}`);
  if (!res.ok) throw new Error(`Status ${res.status}`);
  return await res.json();
}

export async function createOcorrencia(payload: any): Promise<any> {
  const res = await fetch(`${API_BASE_URL}/ocorrencia`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Status ${res.status}`);
  return await res.json();
}

export async function updateOcorrencia(id: string, payload: any): Promise<any> {
  const res = await fetch(`${API_BASE_URL}/ocorrencia/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Status ${res.status}: ${text}`);
  }
  return await res.json();
}

export default {
  getOcorrencias,
  getOcorrenciaById,
};
