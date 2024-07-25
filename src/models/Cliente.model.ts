import { ICliente } from "../interfaces/ICliente";

export class Cliente implements ICliente {
  id: number;
  nomeCompleto: string;
  endereco: string;
  telefone: string;
  email: string;
  dataDeNascimento: string;
  cpf: string;

  constructor(id: number, nomeCompleto: string, endereco: string, telefone: string, email: string, dataDeNascimento: string, cpf: string) {
    this.id = id;
    this.nomeCompleto = nomeCompleto;
    this.endereco = endereco;
    this.telefone = telefone;
    this.email = email;
    this.dataDeNascimento = dataDeNascimento;
    this.cpf = cpf;
  }

  abrirConta(): void {

  }
}