import { Cliente } from './Cliente.model';

export class Gerente {
  private static nextId: number = 1;

  id: number;
  nomeCompleto: string;
  clientes: Cliente[] = [];

  constructor(nomeCompleto: string) {
    this.id = Gerente.nextId++;
    this.nomeCompleto = nomeCompleto;
    this.clientes = [];
  }
}
