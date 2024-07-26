import { Cliente } from "./Cliente.model";

export class Gerente {
  id: number;
  nomeCompleto: string;
  clientes: Cliente[];

  constructor(id: number, nomeCompleto: string) {
    this.id = id;
    this.nomeCompleto = nomeCompleto;
    this.clientes = [];
  }
}