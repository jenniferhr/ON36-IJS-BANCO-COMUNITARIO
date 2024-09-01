import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { Gerente } from '../models/Gerente.model';

@Injectable()
export class GerenteService {
  private readonly filePath = path.resolve('src/gerente/gerentes.json');

  private readGerentes(): Gerente[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Gerente[];
  }

  private writeGerentes(gerentes: Gerente[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(gerentes, null, 2), 'utf8');
  }

  criarGerente(params): Gerente {
    const listaDeGerentes = this.readGerentes();
    const gerente = new Gerente(params.nomeCompleto);

    listaDeGerentes.push(gerente);
    this.writeGerentes(listaDeGerentes);

    return gerente;
  }

  buscarPorId(id: number): Gerente {
    const listaDeGerentes = this.readGerentes();
    const gerente = listaDeGerentes.find((gerente) => gerente.id === id);
    if (!gerente) {
      throw new NotFoundException(`Gerente com id ${id} não foi encontrado`);
    }
    return gerente as Gerente;
  }

  atualizarGerente(gerenteAtualizado: Gerente): void {
    const listaDeGerentes = this.readGerentes();
    const index = listaDeGerentes.findIndex(
      (gerente) => gerente.id === gerenteAtualizado.id,
    );
    if (index !== -1) {
      listaDeGerentes[index] = gerenteAtualizado;
      this.writeGerentes(listaDeGerentes);
    }
  }
}
