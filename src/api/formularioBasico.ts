import API_BASE_URL from './config';

export async function createFormularioBasico(payload: any, token?: string): Promise<any> {
  const headers: any = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}/formulario-basico`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Status ${res.status}: ${text}`);
  }
  return await res.json();
}

export default { createFormularioBasico };
