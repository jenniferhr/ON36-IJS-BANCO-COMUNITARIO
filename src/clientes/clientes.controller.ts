import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CriaClienteDto } from './dto/cria-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  create(@Body() criaClienteDto: CriaClienteDto) {
    return this.clientesService.criarClienteNovo(criaClienteDto);
  }

  @Get()
  buscarTodos() {
    return this.clientesService.buscarTodosOsClientes();
  }

  @Get(':id')
  buscarUm(@Param('id') id: string) {
    return this.clientesService.buscarClientePorId(+id);
  }

  @Delete(':id')
  removeUm(@Param('id') id: string) {
    return this.clientesService.removerCliente(+id);
  }
}
