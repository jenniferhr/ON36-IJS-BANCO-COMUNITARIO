import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GerenteService } from '../gerente/gerente.service';

import { ClientesService } from '../clientes/clientes.service';
import { ContasFactory } from '../../../domain/factories/contas/contas.factory';
import { ContasRepository } from '../../../infrastructure/persistence/repositories/contas/contas.repository';
import { CreateContaDto } from '../../../presenter/http/dto/create-conta.dto';
import { Conta } from '../../../domain/entities/conta';

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
      throw new NotFoundException('Gerente não encontrado');
    }

    const cliente = this.clientesService.buscarClientePorId(idCliente);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const clienteSemContas = { ...cliente };
    delete clienteSemContas.contas;

    try {
      const contaNova = this.contasFactory.criarConta(
        tipo,
        numeroConta,
        clienteSemContas,
        gerente,
        adicionais,
      );

      this.clientesService.adicionarContaACliente(contaNova);
      this.gerenteService.adicionarClienteAoGerente(gerente, clienteSemContas);

      const listaDeContas = this.contasRepository.readContas();
      listaDeContas.push(contaNova);
      this.contasRepository.writeContas(listaDeContas);

      return contaNova;
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao criar conta: ${error.message}`,
      );
    }
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
