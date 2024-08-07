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
  constructor(private readonly gerenteService: GerenteService) {}

  TODO: 'Adicionar validação pra não adicionar conta duplicada; Fazer com que ele coloque as contas na propriedade contas do cliente no json';
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

    let contaCriada = null;

    if (tipo === TipoConta.Corrente) {
      if (limiteChequeEspecial == null) {
        throw new BadRequestException(
          'O limite do cheque especial é obrigatório para contas correntes',
        );
      }
      contaCriada = gerenteResponsavel.abrirContaCorrente(
        numeroConta,
        idCliente,
        limiteChequeEspecial,
        gerenteResponsavel,
      );
    }

    if (tipo === TipoConta.Poupanca) {
      if (taxaJuros == null) {
        throw new BadRequestException(
          'A taxa de juros é obrigatória para contas poupança',
        );
      }
      contaCriada = gerenteResponsavel.abrirContaPoupanca(
        numeroConta,
        idCliente,
        taxaJuros,
        gerenteResponsavel,
      );
    }

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

  removerConta(id: number) {
    return `This action removes a #${id} conta`;
  }
}
