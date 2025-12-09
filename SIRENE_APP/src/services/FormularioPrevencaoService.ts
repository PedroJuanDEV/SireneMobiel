import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class FormularioPrevencaoService {
  static async criarFormulario(data: any) {
    const payload = { ...data, ...(data.dados || {}) };
    delete payload.dados;
    const allowed = new Set([
      'idOcorrencia', 'pontoBase', 'cme', 'tipoVtr', 'numeroAviso', 'diaHora', 'formaAcionamento', 'situacaoOcorrencia',
      'localAcionamento', 'logradouro', 'numeroLogradouro', 'bairro', 'municipioUf', 'latitude', 'longitude', 'fotos', 'videos',
      'observacoes', 'dados', 'criadoEm', 'atualizadoEm'
    ]);
    const dataToSave: any = {};
    Object.keys(payload).forEach((k) => { if (allowed.has(k)) dataToSave[k] = (payload as any)[k]; });
    try {
      return await prisma.formularioPrevencao.create({ data: dataToSave });
    } catch (err: any) {
      console.error('Erro criando FormularioPrevencao. payload keys:', Object.keys(payload));
      console.error('Filtered keys:', Object.keys(dataToSave));
      console.error(err);
      throw err;
    }
  }

  static async listarFormularios() {
    return prisma.formularioPrevencao.findMany();
  }

  static async buscarPorId(id: string) {
    return prisma.formularioPrevencao.findUnique({ where: { id } });
  }

  static async atualizarFormulario(id: string, data: any) {
    const payload = { ...data, ...(data.dados || {}) };
    delete payload.dados;
    const allowed = new Set([
      'idOcorrencia', 'pontoBase', 'cme', 'tipoVtr', 'numeroAviso', 'diaHora', 'formaAcionamento', 'situacaoOcorrencia',
      'localAcionamento', 'logradouro', 'numeroLogradouro', 'bairro', 'municipioUf', 'latitude', 'longitude', 'fotos', 'videos',
      'observacoes', 'dados', 'criadoEm', 'atualizadoEm'
    ]);
    const dataToSave: any = {};
    Object.keys(payload).forEach((k) => { if (allowed.has(k)) dataToSave[k] = (payload as any)[k]; });
    try {
      return await prisma.formularioPrevencao.update({ where: { id }, data: dataToSave });
    } catch (err: any) {
      console.error('Erro atualizando FormularioPrevencao. payload keys:', Object.keys(payload));
      console.error('Filtered keys:', Object.keys(dataToSave));
      console.error(err);
      throw err;
    }
  }

  static async removerFormulario(id: string) {
    return prisma.formularioPrevencao.delete({ where: { id } });
  }
}
