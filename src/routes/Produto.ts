import express from 'express';
import ProdutoControllers from '../controllers/ProdutoControllers';
const produtoRoutes = express.Router();

produtoRoutes.post('/new', ProdutoControllers.create);
produtoRoutes.get('/list', ProdutoControllers.index);