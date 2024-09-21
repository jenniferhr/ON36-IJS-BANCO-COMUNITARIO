import { ICliente } from '../interfaces/ICliente';
import { Conta } from './conta';
import { v4 } from 'uuid';

export class Cliente implements ICliente {
  id: string;
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
    this.id = v4();
    this.nomeCompleto = nomeCompleto;
    this.endereco = endereco;
    this.telefone = telefone;
    this.email = email;
    this.dataDeNascimento = dataDeNascimento;
    this.cpf = cpf;
    this.contas = [];
  }
}
