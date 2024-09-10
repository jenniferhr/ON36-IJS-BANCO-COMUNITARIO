import * as fs from 'fs';
import { Cliente } from 'src/models/Cliente.model';
import { ClientesRepository } from './clientes.repository';
jest.mock('fs');

const mockClientes: Cliente[] = [{} as Cliente];

describe('ContasRepository', () => {
  let clientesRepository: ClientesRepository;

  beforeEach(() => {
    clientesRepository = new ClientesRepository();
  });

  it('readContas - deve ler as contas do arquivo', () => {
    jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValue(JSON.stringify(mockClientes));

    const resultado = clientesRepository.readClientes();

    expect(fs.readFileSync).toHaveBeenCalledTimes(1);
    expect(resultado).toEqual(mockClientes);
  });

  it('writeContas - deve escrever contas no arquivo', () => {
    jest.spyOn(fs, 'writeFileSync').mockReturnValue();
    const mocklistaStringified = JSON.stringify(mockClientes, null, 2);

    clientesRepository.writeClientes(mockClientes);

    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.any(String),
      mocklistaStringified,
      'utf8',
    );
  });
});
