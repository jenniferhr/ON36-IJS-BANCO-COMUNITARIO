import { ICliente } from '../interfaces/ICliente';
import { Conta } from './Conta.model';
import { Gerente } from './Gerente.model';

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
  gerente: Gerente;

  constructor(
    nomeCompleto: string,
    endereco: string,
    telefone: string,
    email: string,
    dataDeNascimento: string,
    cpf: string,
    gerente: Gerente,
  ) {
    this.id = Cliente.nextId++;
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

  removerConta(numeroDaConta: number): void {
    const index = this.contas.findIndex(
      (conta) => conta.numeroDaConta === numeroDaConta,
    );
    if (index !== -1) {
      this.contas.splice(index, 1);
    } else {
      throw new Error('Conta não encontrada');
    }
  }
}
