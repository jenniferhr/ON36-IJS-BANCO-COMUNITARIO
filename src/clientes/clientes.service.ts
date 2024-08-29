import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { Cliente } from 'src/models/Cliente.model';
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

  criarClienteNovo(criaClienteDto): Cliente {
    const { nomeCompleto, endereco, telefone, email, dataDeNascimento, cpf } =
      criaClienteDto;

    const clienteExistente = this.buscarPorCPF(cpf);
    if (clienteExistente) {
      throw new ConflictException('Um cliente com esse CPF já existe.');
    }

    const clienteNovo = new Cliente(
      nomeCompleto,
      endereco,
      telefone,
      email,
      dataDeNascimento,
      cpf,
    );

    const listaDeClientes = this.readClientes();
    listaDeClientes.push(clienteNovo);
    this.writeClientes(listaDeClientes);

    return clienteNovo;
  }

  buscarTodosOsClientes() {
    const listaDeClientes = this.readClientes();
    return listaDeClientes;
  }

  buscarClientePorId(id: number): Cliente {
    const clienteExistente = this.buscarPorIdInterno(id);
    if (!clienteExistente) {
      throw new NotFoundException(
        `Nenhum cliente com o id ${id} foi encontrado.`,
      );
    }

    return clienteExistente;
  }

  atualizarCliente(cliente: Cliente): void {
    const listaDeClientes = this.readClientes();
    const index = listaDeClientes.findIndex((c) => c.id === cliente.id);

    if (index !== -1) {
      listaDeClientes[index] = cliente;
      this.writeClientes(listaDeClientes);
    }
  }

  removerCliente(idCliente: number): Cliente[] {
    const listaDeClientes = this.readClientes();
    const listaAtualizada = listaDeClientes.filter(
      (clientes) => clientes.id !== idCliente,
    );

    this.writeClientes(listaAtualizada);
    return listaAtualizada;
  }

  private buscarPorCPF(cpf): Cliente {
    const listaDeClientes = this.readClientes();

    const cliente = listaDeClientes.find((cliente) => cliente.cpf === cpf);

    return cliente || null;
  }

  private buscarPorIdInterno(id: number): Cliente {
    const listaDeClientes = this.readClientes();

    const cliente = listaDeClientes.find((cliente) => cliente.id === id);

    return cliente || null;
  }
}
