import { ClienteEntity } from './cliente.entity';

export class Gerente {
  id: string;
  nomeCompleto: string;
  clientes: ClienteEntity[];
}
