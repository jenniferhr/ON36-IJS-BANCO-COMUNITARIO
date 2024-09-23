import { Injectable, NotFoundException } from '@nestjs/common';
import { Cliente } from '../../../domain/entities/cliente';
import { Gerente } from '../../../domain/entities/gerente';
import { GerenteRepository } from '../../../infrastructure/persistence/repositories/gerente/gerente.repository';
@Injectable()
export class GerenteService {
  constructor(private readonly gerenteRepository: GerenteRepository) {}

  criarGerente(params): Gerente {
    const listaDeGerentes = this.gerenteRepository.readGerentes();
    const gerente = new Gerente(params.nomeCompleto);

    listaDeGerentes.push(gerente);
    this.gerenteRepository.writeGerentes(listaDeGerentes);

    return gerente;
  }

  buscarPorId(id: string): Gerente {
    const listaDeGerentes = this.gerenteRepository.readGerentes();
    const gerente = listaDeGerentes.find((gerente) => gerente.id === id);
    if (!gerente) {
      throw new NotFoundException(`Gerente com id ${id} não foi encontrado`);
    }
    return gerente as Gerente;
  }

  adicionarClienteAoGerente(gerente: Gerente, cliente: Cliente) {
    gerente.clientes.push(cliente);
    this.atualizarGerente(gerente);
  }

  private atualizarGerente(gerenteAtualizado: Gerente): void {
    const listaDeGerentes = this.gerenteRepository.readGerentes();
    const index = listaDeGerentes.findIndex(
      (gerente) => gerente.id === gerenteAtualizado.id,
    );
    if (index !== -1) {
      listaDeGerentes[index] = gerenteAtualizado;
      this.gerenteRepository.writeGerentes(listaDeGerentes);
    }
  }
}
