import { Injectable } from '@nestjs/common';
import { Gerente } from 'src/models/Gerente.model';

@Injectable()
export class GerenteService {
  private gerentes: Gerente[] = [];

  criarGerente(params): Gerente {
    const gerente = new Gerente(params.id, params.nomeCompleto);
    this.gerentes.push(gerente);
    return gerente;
  }

  obterGerentePorId(id: number): Gerente | undefined {
    return this.gerentes.find((gerente) => gerente.id === id);
  }
}
