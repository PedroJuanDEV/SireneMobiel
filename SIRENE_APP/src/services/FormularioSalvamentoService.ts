import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class FormularioSalvamentoService {
  static async criarFormulario(data: any) {
    const payload = { ...data, ...(data.dados || {}) };
    delete payload.dados;
    const allowed = new Set([
      'idOcorrencia', 'pontoBase', 'qgObm', 'tipoVtr', 'numeroAviso', 'diaHora', 'logradouro', 'numeroLogradouro', 'bairro',
      'municipioUf', 'latitude', 'longitude', 'areaOBM', 'codigoLocal', 'fotos', 'videos', 'descricaoAtendimento', 'observacoes',
      'veiculos', 'guarnicao', 'dados', 'criadoEm', 'atualizadoEm'
    ]);
    const dataToSave: any = {};
    Object.keys(payload).forEach((k) => { if (allowed.has(k)) dataToSave[k] = (payload as any)[k]; });
    try {
      return await prisma.formularioSalvamento.create({ data: dataToSave });
    } catch (err: any) {
      console.error('Erro criando FormularioSalvamento. payload keys:', Object.keys(payload));
      console.error('Filtered keys:', Object.keys(dataToSave));
      console.error(err);
      throw err;
    }
  }

  static async listarFormularios() {
    return prisma.formularioSalvamento.findMany();
  }

  static async buscarPorId(id: string) {
    return prisma.formularioSalvamento.findUnique({ where: { id } });
  }

  static async atualizarFormulario(id: string, data: any) {
    const payload = { ...data, ...(data.dados || {}) };
    delete payload.dados;
    const allowed = new Set([
      'idOcorrencia', 'pontoBase', 'qgObm', 'tipoVtr', 'numeroAviso', 'diaHora', 'logradouro', 'numeroLogradouro', 'bairro',
      'municipioUf', 'latitude', 'longitude', 'areaOBM', 'codigoLocal', 'fotos', 'videos', 'descricaoAtendimento', 'observacoes',
      'veiculos', 'guarnicao', 'dados', 'criadoEm', 'atualizadoEm'
    ]);
    const dataToSave: any = {};
    Object.keys(payload).forEach((k) => { if (allowed.has(k)) dataToSave[k] = (payload as any)[k]; });
    try {
      return await prisma.formularioSalvamento.update({ where: { id }, data: dataToSave });
    } catch (err: any) {
      console.error('Erro atualizando FormularioSalvamento. payload keys:', Object.keys(payload));
      console.error('Filtered keys:', Object.keys(dataToSave));
      console.error(err);
      throw err;
    }
  }

  static async removerFormulario(id: string) {
    return prisma.formularioSalvamento.delete({ where: { id } });
  }
}
