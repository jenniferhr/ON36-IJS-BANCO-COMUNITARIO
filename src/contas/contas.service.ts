import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateContaDto } from './dto/create-conta.dto';
import { GerenteService } from '../gerente/gerente.service';

import { Conta } from '../models/Conta.model';
import { ClientesService } from '../clientes/clientes.service';
import { ContasFactory } from './contas.factory';
import { ContasRepository } from './repository/contas.repository';

@Injectable()
export class ContasService {
  constructor(
    private readonly gerenteService: GerenteService,
    private readonly clientesService: ClientesService,
    private readonly contasFactory: ContasFactory,
    private readonly contasRepository: ContasRepository,
  ) {}

  criarConta(createContaDto: CreateContaDto) {
    const { idCliente, idGerente, numeroConta, tipo, ...adicionais } =
      createContaDto;

    const gerente = this.gerenteService.buscarPorId(idGerente);
    if (!gerente) {
      throw new Error('Gerente não encontrado');
    }

    const cliente = this.clientesService.buscarClientePorId(idCliente);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    const clienteSemContas = { ...cliente };
    delete clienteSemContas.contas;

    const contaNova = this.contasFactory.criarConta(
      tipo,
      numeroConta,
      clienteSemContas,
      gerente,
      adicionais,
    );

    if (!contaNova) {
      throw new InternalServerErrorException('A conta não pôde ser criada.');
    }

    this.clientesService.adicionarContaACliente(contaNova);
    this.gerenteService.adicionarClienteAoGerente(gerente, clienteSemContas);

    const listaDeContas = this.contasRepository.readContas();
    listaDeContas.push(contaNova);
    this.contasRepository.writeContas(listaDeContas);

    return contaNova;
  }

  buscarTodasAsContas() {
    const listaDeContas = this.contasRepository.readContas();
    return listaDeContas;
  }

  buscarPorNumero(numeroDaConta: number) {
    const listaDeContas = this.contasRepository.readContas();

    const conta = listaDeContas.find(
      (conta) => conta.numeroDaConta === numeroDaConta,
    );
    if (!conta) {
      throw new NotFoundException(
        `Conta com número ${numeroDaConta} não foi encontrado`,
      );
    }
    return conta as Conta;
  }

  removerConta(numeroDaConta: number) {
    const conta = this.buscarPorNumero(numeroDaConta);

    const listaDeContas = this.contasRepository.readContas();
    const listaAtualizada = listaDeContas.filter(
      (contas) => contas.numeroDaConta !== numeroDaConta,
    );
    this.contasRepository.writeContas(listaAtualizada);

    this.clientesService.removerContaDeCliente(conta);

    return listaAtualizada;
  }
}
