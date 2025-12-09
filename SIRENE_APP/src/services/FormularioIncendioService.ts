import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class FormularioIncendioService {
  static async criarFormulario(data: any) {
    const payload = { ...data, ...(data.dados || {}) };
    delete payload.dados;
    const allowed = new Set([
      'idOcorrencia', 'localIncendio', 'enderecoComplemento', 'tipoIncendio', 'houveDanos', 'numeroVitimas', 'materialCombustao',
      'areaAtingidaM2', 'latitude', 'longitude', 'tipoAgua', 'resgateVitimas', 'tempoCombateMin', 'aguaUtilizadaLitros', 'fotos', 'videos',
      'dados', 'criadoEm', 'atualizadoEm'
    ]);
    const dataToSave: any = {};
    Object.keys(payload).forEach((k) => { if (allowed.has(k)) dataToSave[k] = (payload as any)[k]; });
    try {
      return await prisma.formularioIncendio.create({ data: dataToSave });
    } catch (err: any) {
      console.error('Erro criando FormularioIncendio. payload keys:', Object.keys(payload));
      console.error('Filtered keys:', Object.keys(dataToSave));
      console.error(err);
      throw err;
    }
  }

  static async listarFormularios() {
    return prisma.formularioIncendio.findMany();
  }

  static async buscarPorId(id: string) {
    return prisma.formularioIncendio.findUnique({ where: { id } });
  }

  static async atualizarFormulario(id: string, data: any) {
    const payload = { ...data, ...(data.dados || {}) };
    delete payload.dados;
    const allowed = new Set([
      'idOcorrencia', 'localIncendio', 'enderecoComplemento', 'tipoIncendio', 'houveDanos', 'numeroVitimas', 'materialCombustao',
      'areaAtingidaM2', 'latitude', 'longitude', 'tipoAgua', 'resgateVitimas', 'tempoCombateMin', 'aguaUtilizadaLitros', 'fotos', 'videos',
      'dados', 'criadoEm', 'atualizadoEm'
    ]);
    const dataToSave: any = {};
    Object.keys(payload).forEach((k) => { if (allowed.has(k)) dataToSave[k] = (payload as any)[k]; });
    try {
      return await prisma.formularioIncendio.update({ where: { id }, data: dataToSave });
    } catch (err: any) {
      console.error('Erro atualizando FormularioIncendio. payload keys:', Object.keys(payload));
      console.error('Filtered keys:', Object.keys(dataToSave));
      console.error(err);
      throw err;
    }
  }

  static async removerFormulario(id: string) {
    return prisma.formularioIncendio.delete({ where: { id } });
  }
}
