import { randomUUID } from 'crypto';
import { Cliente } from './Cliente.model';

export class Gerente {
  id: string;
  nomeCompleto: string;
  clientes: Cliente[] = [];

  constructor(nomeCompleto: string) {
    this.id = randomUUID();
    this.nomeCompleto = nomeCompleto;
    this.clientes = [];
  }
}
