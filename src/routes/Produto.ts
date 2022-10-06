import express from 'express';
import ProdutoControllers from '../controllers/ProdutoControllers';
const produtoRoutes = express.Router();

produtoRoutes.post('/new', ProdutoControllers.criar);
produtoRoutes.get('/list', ProdutoControllers.indice);
produtoRoutes.post('/find', ProdutoControllers.buscar);
produtoRoutes.post('/delete', ProdutoControllers.deletar);

export default produtoRoutes;