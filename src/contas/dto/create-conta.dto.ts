import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { TipoConta } from 'src/interfaces/IConta';

TODO: 'Corrigir essa validação pra fazer ela funcionar';
export class CreateContaDto {
  @IsNotEmpty()
  @IsNumber()
  idCliente: number;

  @IsNotEmpty()
  @IsNumber()
  idGerente: number;

  @IsNotEmpty()
  @IsNumber()
  numeroConta: number;

  @IsNotEmpty()
  @IsEnum(TipoConta)
  tipo: TipoConta;

  @ValidateIf((o) => o.tipo === TipoConta.Poupanca)
  @IsOptional()
  @IsNumber()
  taxaJuros?: number;

  @ValidateIf((o) => o.tipo === TipoConta.Corrente)
  @IsOptional()
  @IsNumber()
  limiteChequeEspecial?: number;
}
