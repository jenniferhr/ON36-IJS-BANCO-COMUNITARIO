import { Injectable, NotFoundException } from '@nestjs/common';
import { GerenteService } from 'src/gerente/gerente.service';
import * as path from 'path';
import * as fs from 'fs';
import { Cliente } from 'src/models/Cliente.model';
import { Gerente } from 'src/models/Gerente.model';

@Injectable()
export class ClientesService {
  private readonly filePath = path.resolve('src/clientes/clientes.json');

  private readClientes(): Cliente[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Cliente[];
  }

  private writeClientes(clientes: Cliente[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(clientes, null, 2), 'utf8');
  }

  constructor(private readonly gerenteService: GerenteService) {}

  criarClienteNovo(
    gerenteId,
    nomeCompleto,
    endereco,
    telefone,
    email,
    dataDeNascimento,
    cpf,
  ): Cliente {
    const gerente = this.gerenteService.buscarPorId(+gerenteId);
    if (!gerente) {
      throw new Error('Gerente não encontrado');
    }

    const gerenteResponsavel = Object.setPrototypeOf(
      gerente,
      Gerente.prototype,
    );

    const listaDeClientes = this.readClientes();

    const novoCliente = gerenteResponsavel.criarCliente(
      nomeCompleto,
      endereco,
      telefone,
      email,
      dataDeNascimento,
      cpf,
    );

    listaDeClientes.push(novoCliente);
    this.writeClientes(listaDeClientes);

    return novoCliente;
  }

  buscarTodosOsClientes() {
    const listaDeClientes = this.readClientes();
    return listaDeClientes;
  }

  buscarPorId(id: number): Cliente {
    const listaDeeClientes = this.readClientes();

    const cliente = listaDeeClientes.find((cliente) => cliente.id === id);
    if (!cliente) {
      throw new NotFoundException(`Gerente com id ${id} não foi encontrado`);
    }
    return cliente as Cliente;
  }

  // update(id: number, updateClienteDto: UpdateClienteDto) {
  //   return `This action updates a #${id} cliente`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} cliente`;
  // }
}
