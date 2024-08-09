import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContaDto } from './dto/create-conta.dto';
import { TipoConta } from 'src/interfaces/IConta';
import { GerenteService } from 'src/gerente/gerente.service';
import { Gerente } from 'src/models/Gerente.model';
import * as path from 'path';
import * as fs from 'fs';
import { Conta } from 'src/models/Conta.model';
import { ClientesService } from 'src/clientes/clientes.service';

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
  ) {}

  // TODO: 'Adicionar validação pra não adicionar conta duplicada; Fazer com que ele coloque as contas na propriedade contas do cliente no json; fazer com que ele retorne o erro que o método do gerente retorna já que o try catch não está funcionando pra isso';
  criarConta(createContaDto: CreateContaDto) {
    const {
      idCliente,
      idGerente,
      numeroConta,
      tipo,
      taxaJuros,
      limiteChequeEspecial,
    } = createContaDto;

    const tiposDeContaValidos = Object.values(TipoConta);

    if (!tiposDeContaValidos.includes(tipo)) {
      throw new BadRequestException(
        `Tipo de conta inválido. Possíveis tipos: ${tiposDeContaValidos.join(', ')}`,
      );
    }

    const gerente = this.gerenteService.buscarPorId(+idGerente);
    if (!gerente) {
      throw new Error('Gerente não encontrado');
    }

    const gerenteResponsavel = Object.setPrototypeOf(
      gerente,
      Gerente.prototype,
    );

    let contaCriada: Conta = null;

    const cliente = this.clientesService.buscarPorId(+idCliente);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    if (tipo === TipoConta.Corrente) {
      if (limiteChequeEspecial == null) {
        throw new BadRequestException(
          'O limite do cheque especial é obrigatório para contas correntes',
        );
      }
      try {
        contaCriada = gerenteResponsavel.abrirContaCorrente(
          numeroConta,
          idCliente,
          limiteChequeEspecial,
          gerenteResponsavel,
        );
      } catch (err) {
        throw err;
      }
    }

    if (tipo === TipoConta.Poupanca) {
      if (taxaJuros == null) {
        throw new BadRequestException(
          'A taxa de juros é obrigatória para contas poupança',
        );
      }
      try {
        contaCriada = gerenteResponsavel.abrirContaPoupanca(
          numeroConta,
          idCliente,
          taxaJuros,
          gerenteResponsavel,
        );
      } catch (err) {
        throw err;
      }
    }

    gerenteResponsavel.adicionarContasACliente(cliente, contaCriada);
    this.clientesService.atualizarCliente(cliente);

    const listaDeContas = this.readContas();
    listaDeContas.push(contaCriada);
    this.writeContas(listaDeContas);

    return contaCriada;
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

  // update(id: number, updateContaDto: UpdateContaDto) {
  //   return `This action updates a #${id} conta`;
  // }

  // TODO: consertar essa remoção pra garantir que está sendo removida mesmo em todo lugar
  removerConta(numeroDaConta: number, idGerente: number) {
    const gerente = this.gerenteService.buscarPorId(+idGerente);
    if (!gerente) {
      throw new Error('Gerente não encontrado');
    }

    const gerenteResponsavel = Object.setPrototypeOf(
      gerente,
      Gerente.prototype,
    );

    this.gerenteService.atualizarGerente(gerenteResponsavel);

    const listaDeContas = this.readContas();
    const listaAtualizada = listaDeContas.filter(
      (contas) => contas.numeroDaConta !== numeroDaConta,
    );

    this.writeContas(listaAtualizada);
    return listaAtualizada;
  }
}
