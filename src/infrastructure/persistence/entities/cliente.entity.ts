import { ContaEntity } from './conta.entity';

export class ClienteEntity {
  id: string;
  nomeCompleto: string;
  endereco: string;
  telefone: string;
  email: string;
  dataDeNascimento: string;
  cpf: string;
  contas: ContaEntity[];
}
