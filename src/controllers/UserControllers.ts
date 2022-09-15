import { Request, Response } from 'express';
import { User } from '../models/Users';
import * as Yup from 'yup';
// yarn add yup @types/yup
const userSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    cpf: Yup.string().required(),
});
const deleteUserSchema = Yup.object().shape({
    email: Yup.string().email().required(),
});
export default {
    async create(request: Request, response: Response) {
        const { name, email, cpf } = request.body;

        if (!(await userSchema.isValid({ name, email, cpf }))) {
            return response
                .status(401)
                .json({ message: 'dados fornecidos incorretamente' });
        }

        const existing = await User.findOne({ email });
        if (!existing) {
            const user = await User.create({ name, email, cpf });
            return response.status(200).json({
                message: 'Usuario criado com sucesso',
                user,
            });
        }
        return response
            .status(201)
            .json({ message: 'Usuario ja existe no BD' });
    },
    async index(request: Request, response: Response) {
        // atribui à existing
        // o retorno da chamada do método find
        // no modelo User
        const existing = await User.find();
        if (!existing) {
            return response
                .status(401)
                .json({ message: 'Nenhum usuario encontrado' });
        }
        return response.status(200).json(existing);
    },
    async update(request: Request, response: Response) {
        const { name, email, cpf } = request.body;

        const user = await User.findOneAndUpdate(
            {
                name,
            },
            {
                email,
                cpf,
            }
        );
        if (user) {
            return response.status(200).json({ message: 'Usuario atualizado' });
        }
        return response.status(400).json({ message: 'usuario nao encontrado' });
    },
    async findOne(request: Request, response: Response) {
        const { name, email, cpf } = request.body;
        const user = await User.find({
            $or: [{ name: name }, { email: email }, { cpf: cpf }],
        });
        if (user) {
            return response.status(200).json(user);
        }
        return response.status(400).json({ message: 'usuario nao encontrado' });
    },
    async delete(request: Request, response: Response) {
        const { email } = request.body;

        if (!(await deleteUserSchema.isValid({ email }))) {
            return response.status(401).json({ message: 'email invalido' });
        }
        const result = await User.findOneAndDelete({ email });
        if (result) {
            return response
                .status(200)
                .json({ message: 'usuario removido com sucesso' });
        }
        return response.status(400).json({ message: 'usuario nao encontrado' });
    },
};
