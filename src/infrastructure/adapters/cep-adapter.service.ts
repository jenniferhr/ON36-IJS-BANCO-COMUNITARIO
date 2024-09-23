import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { formatarEndereco } from '../helpers/formata-endereco';
import { ICepService } from '../../application/ports/cep-adapter.interface';

@Injectable()
export class CepService implements ICepService {
  constructor(private readonly httpService: HttpService) {}

  async consultaCep(cep: string): Promise<string | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`https://viacep.com.br/ws/${cep}/json/`),
      );
      if (response.data.erro) {
        return null;
      }
      const endereco = formatarEndereco(response.data);

      return endereco;
    } catch (error) {
      return null;
    }
  }
}

/* 
{
"cep": "44050-422",
"logradouro": "Rua Rio Grande do Norte",
"complemento": "",
"unidade": "",
"bairro": "Queimadinha",
"localidade": "Feira de Santana",
"uf": "BA",
"estado": "Bahia",
"regiao": "Nordeste",
"ibge": "2910800",
"gia": "",
"ddd": "75",
"siafi": "3515"
}

Endereço: ${response.data.logradouro}, ${response.data.complemento}, ${response.data.bairro}, ${response.data.localidade}, ${response.data.uf}
*/
