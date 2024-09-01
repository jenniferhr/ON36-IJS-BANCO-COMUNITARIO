import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';
import { TipoConta } from '../../interfaces/IConta';

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
  @Min(0)
  taxaJuros?: number;

  @ValidateIf((o) => o.tipo === TipoConta.Corrente)
  @IsOptional()
  @IsNumber()
  @Min(0)
  limiteChequeEspecial?: number;
}
