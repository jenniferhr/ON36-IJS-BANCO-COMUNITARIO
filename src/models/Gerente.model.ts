import { v4 } from 'uuid';
import { Cliente } from './Cliente.model';

export class Gerente {
  id: string;
  nomeCompleto: string;
  clientes: Cliente[] = [];

  constructor(nomeCompleto: string) {
    this.id = v4();
    this.nomeCompleto = nomeCompleto;
    this.clientes = [];
  }
}
