import { TipoConta } from '../../../domain/interfaces/IConta';
import { ClienteEntity } from './cliente.entity';

export class ContaEntity {
  numeroDaConta: number;
  cliente: ClienteEntity;
  saldo: number;
  tipo: TipoConta;
  taxaJuros?: number;
  limiteChequeEspecial?: number;
  gerente: string;
  ativa: boolean;
}
