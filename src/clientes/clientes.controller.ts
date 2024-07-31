import { Body, Controller, Post } from '@nestjs/common';
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

  // @Get()
  // findAll() {
  //   return this.clientesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.clientesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
  //   return this.clientesService.update(+id, updateClienteDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.clientesService.remove(+id);
  // }
}
