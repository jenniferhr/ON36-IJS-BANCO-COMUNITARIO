import { ICliente } from "../interfaces/ICliente";
import { Conta } from "./Conta.model";
import { Gerente } from "./Gerente.model";

export class Cliente implements ICliente {
  id: number;
  nomeCompleto: string;
  endereco: string;
  telefone: string;
  email: string;
  dataDeNascimento: string;
  cpf: string;
  contas: Conta[]
  gerente: Gerente;

  constructor(id: number, nomeCompleto: string, endereco: string, telefone: string, email: string, dataDeNascimento: string, cpf: string, gerente: Gerente) {
    this.id = id;
    this.nomeCompleto = nomeCompleto;
    this.endereco = endereco;
    this.telefone = telefone;
    this.email = email;
    this.dataDeNascimento = dataDeNascimento;
    this.cpf = cpf;
    this.gerente = gerente;
    this.contas = [];
  }

  adicionarConta(conta: Conta) {
    this.contas.push(conta);
  }

}