import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class FormularioPreHospitalService {
  static async criarFormulario(data: any) {
    const payload = { ...data, ...(data.dados || {}) };
    delete payload.dados;
    const allowed = new Set([
      'idOcorrencia', 'pontoBase', 'ome', 'viaturaDestino', 'numeroAviso', 'latitude', 'longitude', 'elevacao', 'numeroGps',
      'areaCBM', 'areaCBM_vazio', 'motivoAreaVazio', 'fotos', 'videos', 'assinaturaDigital', 'idade', 'sexo', 'documentoPessoa',
      'tipoAcidente', 'tempoCenaMin', 'atrasoInternoMin', 'horarioSaida', 'horarioNoLocal', 'horarioChegadaHosp', 'horarioFinalizacao',
      'ctfLocal', 'ctfVtrLocal', 'numeroDespachante', 'atendimentoDescricao', 'eventoNatureza', 'tipoVitima', 'gravidadeVitima',
      'prioridadeVitima', 'veiculos', 'guarnicao', 'dados', 'criadoEm', 'atualizadoEm'
    ]);
    const dataToSave: any = {};
    Object.keys(payload).forEach((k) => { if (allowed.has(k)) dataToSave[k] = (payload as any)[k]; });
    try {
      return await prisma.formularioPreHospital.create({ data: dataToSave });
    } catch (err: any) {
      console.error('Erro criando FormularioPreHospital. payload keys:', Object.keys(payload));
      console.error('Filtered keys:', Object.keys(dataToSave));
      console.error(err);
      throw err;
    }
  }

  static async listarFormularios() {
    return prisma.formularioPreHospital.findMany();
  }

  static async buscarPorId(id: string) {
    return prisma.formularioPreHospital.findUnique({ where: { id } });
  }

  static async atualizarFormulario(id: string, data: any) {
    const payload = { ...data, ...(data.dados || {}) };
    delete payload.dados;
    const allowed = new Set([
      'idOcorrencia', 'pontoBase', 'ome', 'viaturaDestino', 'numeroAviso', 'latitude', 'longitude', 'elevacao', 'numeroGps',
      'areaCBM', 'areaCBM_vazio', 'motivoAreaVazio', 'fotos', 'videos', 'assinaturaDigital', 'idade', 'sexo', 'documentoPessoa',
      'tipoAcidente', 'tempoCenaMin', 'atrasoInternoMin', 'horarioSaida', 'horarioNoLocal', 'horarioChegadaHosp', 'horarioFinalizacao',
      'ctfLocal', 'ctfVtrLocal', 'numeroDespachante', 'atendimentoDescricao', 'eventoNatureza', 'tipoVitima', 'gravidadeVitima',
      'prioridadeVitima', 'veiculos', 'guarnicao', 'dados', 'criadoEm', 'atualizadoEm'
    ]);
    const dataToSave: any = {};
    Object.keys(payload).forEach((k) => { if (allowed.has(k)) dataToSave[k] = (payload as any)[k]; });
    try {
      return await prisma.formularioPreHospital.update({ where: { id }, data: dataToSave });
    } catch (err: any) {
      console.error('Erro atualizando FormularioPreHospital. payload keys:', Object.keys(payload));
      console.error('Filtered keys:', Object.keys(dataToSave));
      console.error(err);
      throw err;
    }
  }

  static async removerFormulario(id: string) {
    return prisma.formularioPreHospital.delete({ where: { id } });
  }
}
