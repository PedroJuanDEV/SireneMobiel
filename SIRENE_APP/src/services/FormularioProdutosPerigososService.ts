import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class FormularioProdutosPerigososService {
  static async criarFormulario(data: any) {
    const payload = { ...data, ...(data.dados || {}) };
    delete payload.dados;
    const allowed = new Set([
      'idOcorrencia', 'pontoBase', 'cme', 'tipoVtr', 'numeroAviso', 'diaHora', 'descricaoRisco', 'material', 'quantidade',
      'riscoPrincipal', 'medidasAdotadas', 'fotos', 'videos', 'dados', 'criadoEm', 'atualizadoEm'
    ]);
    const dataToSave: any = {};
    Object.keys(payload).forEach((k) => { if (allowed.has(k)) dataToSave[k] = (payload as any)[k]; });
    try {
      return await prisma.formularioProdutosPerigosos.create({ data: dataToSave });
    } catch (err: any) {
      console.error('Erro criando FormularioProdutosPerigosos. payload keys:', Object.keys(payload));
      console.error('Filtered keys:', Object.keys(dataToSave));
      console.error(err);
      throw err;
    }
  }

  static async listarFormularios() {
    return prisma.formularioProdutosPerigosos.findMany();
  }

  static async buscarPorId(id: string) {
    return prisma.formularioProdutosPerigosos.findUnique({ where: { id } });
  }

  static async atualizarFormulario(id: string, data: any) {
    const payload = { ...data, ...(data.dados || {}) };
    delete payload.dados;
    const allowed = new Set([
      'idOcorrencia', 'pontoBase', 'cme', 'tipoVtr', 'numeroAviso', 'diaHora', 'descricaoRisco', 'material', 'quantidade',
      'riscoPrincipal', 'medidasAdotadas', 'fotos', 'videos', 'dados', 'criadoEm', 'atualizadoEm'
    ]);
    const dataToSave: any = {};
    Object.keys(payload).forEach((k) => { if (allowed.has(k)) dataToSave[k] = (payload as any)[k]; });
    try {
      return await prisma.formularioProdutosPerigosos.update({ where: { id }, data: dataToSave });
    } catch (err: any) {
      console.error('Erro atualizando FormularioProdutosPerigosos. payload keys:', Object.keys(payload));
      console.error('Filtered keys:', Object.keys(dataToSave));
      console.error(err);
      throw err;
    }
  }

  static async removerFormulario(id: string) {
    return prisma.formularioProdutosPerigosos.delete({ where: { id } });
  }
}
