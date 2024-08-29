import { Conta } from '../models/Conta.model';

export interface ICliente {
  id: number;
  nomeCompleto: string;
  endereco: string;
  telefone: string;
  email: string;
  dataDeNascimento: string;
  cpf: string;
  contas: Conta[];
}
