import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateContaDto } from './dto/create-conta.dto';
import { GerenteService } from '../gerente/gerente.service';
import * as path from 'path';
import * as fs from 'fs';
import { Conta } from '../models/Conta.model';
import { ClientesService } from '../clientes/clientes.service';
import { ContasFactory } from './contas.factory';

@Injectable()
export class ContasService {
  private readonly filePath = path.resolve('src/contas/contas.json');

  private readContas(): Conta[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Conta[];
  }

  private writeContas(contas: Conta[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(contas, null, 2), 'utf8');
  }
  constructor(
    private readonly gerenteService: GerenteService,
    private readonly clientesService: ClientesService,
    private readonly contasFactory: ContasFactory,
  ) {}

  criarConta(createContaDto: CreateContaDto) {
    const { idCliente, idGerente, numeroConta, tipo, ...adicionais } =
      createContaDto;

    const gerente = this.gerenteService.buscarPorId(+idGerente);
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

    const listaDeContas = this.readContas();
    listaDeContas.push(contaNova);
    this.writeContas(listaDeContas);

    return contaNova;
  }

  buscarTodasAsContas() {
    const listaDeContas = this.readContas();
    return listaDeContas;
  }

  buscarPorNumero(numeroDaConta: number) {
    const listaDeContas = this.readContas();

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

    const listaDeContas = this.readContas();
    const listaAtualizada = listaDeContas.filter(
      (contas) => contas.numeroDaConta !== numeroDaConta,
    );
    this.writeContas(listaAtualizada);

    this.clientesService.removerContaDeCliente(conta);

    return listaAtualizada;
  }
}
