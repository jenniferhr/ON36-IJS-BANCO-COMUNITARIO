import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxDate } from 'class-validator';

const today = new Date();
const minDate = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate(),
);

export class CriaClienteDto {
  @IsString()
  @IsNotEmpty()
  nomeCompleto: string;

  @IsString()
  endereco: string;

  @IsString()
  telefone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Type(() => Date)
  @MaxDate(minDate, { message: 'Cliente deve ter pelo menos 18 anos' })
  dataDeNascimento: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;
}
