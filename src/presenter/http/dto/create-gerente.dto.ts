import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGerenteDto {
  @IsString()
  @IsNotEmpty()
  nomeCompleto: string;
}
