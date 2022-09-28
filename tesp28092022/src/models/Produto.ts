import mongoose, { Schema } from 'mongoose';
export interface UserInteface {
    nome: string,
    descricao: string,
    quantidadeEstoque: number,
    preco: number,
    precoPromocional: number,
    precoPromoAtivado: boolean,
    tipo: string
}
const userSchemaCardapio = new Schema(
    {
    nome: String,
    descricao: String,
    quantidadeEstoque: Number,
    preco: Number,
    precoPromocional: Number,
    precoPromoAtivado: Boolean,
    tipo: String
    },
    {
        timestamps: true,
    }
);
export const User = mongoose.model('User', userSchemaCardapio, 'users');
{
}