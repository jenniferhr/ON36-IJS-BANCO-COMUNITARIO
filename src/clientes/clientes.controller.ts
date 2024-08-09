import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CriaClienteDto } from './dto/cria-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  create(@Body() criaClienteDto: CriaClienteDto) {
    const {
      gerenteId,
      nomeCompleto,
      endereco,
      telefone,
      email,
      dataDeNascimento,
      cpf,
    } = criaClienteDto;

    return this.clientesService.criarClienteNovo(
      gerenteId,
      nomeCompleto,
      endereco,
      telefone,
      email,
      dataDeNascimento,
      cpf,
    );
  }

  @Get()
  buscarTodos() {
    return this.clientesService.buscarTodosOsClientes();
  }

  @Get(':id')
  buscarUm(@Param('id') id: string) {
    return this.clientesService.buscarPorId(+id);
  }

  @Delete(':idCliente')
  removeUm(
    @Param('idCliente') idCliente: string,
    @Query('idGerente') idGerente: string,
  ) {
    return this.clientesService.removerCliente(+idCliente, +idGerente);
  }
}
