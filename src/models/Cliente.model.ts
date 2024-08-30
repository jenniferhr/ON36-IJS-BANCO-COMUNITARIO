import { ICliente } from '../interfaces/ICliente';
import { Conta } from './Conta.model';

export class Cliente implements ICliente {
  private static nextId: number = 1;
  id: number;
  nomeCompleto: string;
  endereco: string;
  telefone: string;
  email: string;
  dataDeNascimento: string;
  cpf: string;
  contas: Conta[];

  constructor(
    nomeCompleto: string,
    endereco: string,
    telefone: string,
    email: string,
    dataDeNascimento: string,
    cpf: string,
  ) {
    this.id = Cliente.nextId++;
    this.nomeCompleto = nomeCompleto;
    this.endereco = endereco;
    this.telefone = telefone;
    this.email = email;
    this.dataDeNascimento = dataDeNascimento;
    this.cpf = cpf;
    this.contas = [];
  }
}
