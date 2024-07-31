import { Injectable } from '@nestjs/common';
import { GerenteService } from 'src/gerente/gerente.service';

@Injectable()
export class ClientesService {
  constructor(private readonly gerenteService: GerenteService) {}

  criarClienteNovo(
    gerenteId,
    nomeCompleto,
    endereco,
    telefone,
    email,
    dataDeNascimento,
    cpf,
  ) {
    const gerente = this.gerenteService.buscarPorId(+gerenteId);
    if (!gerente) {
      throw new Error('Gerente não encontrado');
    }

    const novoCliente = gerente.criarCliente(
      nomeCompleto,
      endereco,
      telefone,
      email,
      dataDeNascimento,
      cpf,
    );
    return novoCliente;
  }
  // findAll() {
  //   return `This action returns all clientes`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} cliente`;
  // }
  // update(id: number, updateClienteDto: UpdateClienteDto) {
  //   return `This action updates a #${id} cliente`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} cliente`;
  // }
}
