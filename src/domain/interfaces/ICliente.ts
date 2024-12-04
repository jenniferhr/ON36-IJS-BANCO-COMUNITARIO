import { Conta } from '../entities/conta';

export interface ICliente {
  id: string;
  nomeCompleto: string;
  endereco: string;
  telefone: string;
  email: string;
  dataDeNascimento: string;
  cpf: string;
  contas: Conta[];
}
