import { Router } from 'express';
import { FormularioPrevencaoController } from '../controllers/FormularioPrevencaoController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, FormularioPrevencaoController.listarFormularios);
router.post('/', authenticateToken, FormularioPrevencaoController.criarFormulario);
router.get('/:id', authenticateToken, FormularioPrevencaoController.buscarPorId);
router.put('/:id', authenticateToken, FormularioPrevencaoController.atualizarFormulario);
router.delete('/:id', authenticateToken, FormularioPrevencaoController.removerFormulario);

export default router;
