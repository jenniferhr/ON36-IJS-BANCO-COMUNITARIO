import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
  ValidateIf,
} from 'class-validator';
import { TipoConta } from '../../../domain/interfaces/IConta';

export class CreateContaDto {
  @IsNotEmpty()
  @IsUUID()
  idCliente: string;

  @IsNotEmpty()
  @IsUUID()
  idGerente: string;

  @IsNotEmpty()
  @IsNumber()
  numeroConta: number;

  @IsNotEmpty()
  @IsEnum(TipoConta)
  tipo: TipoConta;

  @ValidateIf((o) => o.tipo === TipoConta.Poupanca)
  @IsOptional()
  @IsNumber()
  @Min(0)
  taxaJuros?: number;

  @ValidateIf((o) => o.tipo === TipoConta.Corrente)
  @IsOptional()
  @IsNumber()
  @Min(0)
  limiteChequeEspecial?: number;
}
