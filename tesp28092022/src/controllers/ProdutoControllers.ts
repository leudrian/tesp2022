import { Request, Response } from 'express';
import { User } from '../models/Users';
import * as Yup from 'yup';

const produtoSchema = Yup.object().shape({
    nome: Yup.string().required(),
    descricao: Yup.string().required(),
    quantidadeEstoque: Yup.number().required(),
    preco: Yup.number().required(),
    precoPromocional: Yup.number().required(),
    precoPromoAtivado: Yup.boolean().required(),
    tipo: Yup.string().required()
});

export default {
    async create(request: Request, response: Response){
        const{ nome, descricao, quantidadeEstoque, preco, precoPromocional, precoPromoAtivado, tipo} = request.body;

        if (
            !(await produtoSchema.isValid({
                nome,
                descricao,
                quantidadeEstoque,
                preco,
                precoPromocional,
                precoPromoAtivado,
                tipo
            }))
        ){
            return response
                .status(401)
                .json({ message: 'Dados fornecidos incorretamente'});
        }

        const existing = await Produto.findeOne({ nome });
        if (!existing) {
            const produto = await Produto.create({
                nome,
                descricao,
                quantidadeEstoque,
                preco,
                precoPromocional,
                precoPromoAtivado,
                tipo
            });
            return response.status(200).json({
                message: 'Produto criado com sucesso',
                produto,
            })
        }
    }
}