import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class FormularioBasicoService {
  static async criarFormulario(data: any) {
    const payload = { ...data, ...(data.dados || {}) };
    delete payload.dados;
    // whitelist of allowed fields based on prisma schema
    const allowed = new Set([
      'idOcorrencia', 'pontoBase', 'ome', 'viaturaResponsavel', 'numeroAviso', 'data', 'horaRecebimento',
      'formaAcionamento', 'formaAcionamentoOutros', 'situacaoOcorrencia', 'situacaoOcorrenciaOutros',
      'localAcionamento', 'localAcionamentoOutros', 'areaOBM', 'codigoLocal', 'referencia', 'solicitanteNome',
      'solicitanteTelefone', 'deslocamento', 'viaturaLocal', 'placaViaturaLocal', 'apoio', 'viaturasEnvolvidas',
      'historico', 'continuacao', 'dificuldadesAtuacao', 'eventoNatureza', 'formulariosPreenchidos', 'tipoVitima',
      'veiculosEnvolvidos', 'guarnicaoEmpenhada', 'vistoDivisaoOperacoes', 'dados', 'criadoEm', 'atualizadoEm'
    ]);

    const dataToSave: any = {};
    Object.keys(payload).forEach((k) => {
      if (allowed.has(k)) dataToSave[k] = (payload as any)[k];
    });

    try {
      return await prisma.formularioBasico.create({ data: dataToSave });
    } catch (err: any) {
      console.error('Erro criando FormularioBasico. payload keys:', Object.keys(payload));
      console.error('Filtered keys:', Object.keys(dataToSave));
      console.error(err);
      throw err;
    }
  }

  static async listarFormularios() {
    return prisma.formularioBasico.findMany();
  }

  static async buscarPorId(id: string) {
    return prisma.formularioBasico.findUnique({ where: { id } });
  }

  static async atualizarFormulario(id: string, data: any) {
    const payload = { ...data, ...(data.dados || {}) };
    delete payload.dados;
    const allowed = new Set([
      'idOcorrencia', 'pontoBase', 'ome', 'viaturaResponsavel', 'numeroAviso', 'data', 'horaRecebimento',
      'formaAcionamento', 'formaAcionamentoOutros', 'situacaoOcorrencia', 'situacaoOcorrenciaOutros',
      'localAcionamento', 'localAcionamentoOutros', 'areaOBM', 'codigoLocal', 'referencia', 'solicitanteNome',
      'solicitanteTelefone', 'deslocamento', 'viaturaLocal', 'placaViaturaLocal', 'apoio', 'viaturasEnvolvidas',
      'historico', 'continuacao', 'dificuldadesAtuacao', 'eventoNatureza', 'formulariosPreenchidos', 'tipoVitima',
      'veiculosEnvolvidos', 'guarnicaoEmpenhada', 'vistoDivisaoOperacoes', 'dados', 'criadoEm', 'atualizadoEm'
    ]);
    const dataToSave: any = {};
    Object.keys(payload).forEach((k) => {
      if (allowed.has(k)) dataToSave[k] = (payload as any)[k];
    });
    try {
      return await prisma.formularioBasico.update({ where: { id }, data: dataToSave });
    } catch (err: any) {
      console.error('Erro atualizando FormularioBasico. payload keys:', Object.keys(payload));
      console.error('Filtered keys:', Object.keys(dataToSave));
      console.error(err);
      throw err;
    }
  }

  static async removerFormulario(id: string) {
    return prisma.formularioBasico.delete({ where: { id } });
  }
}
