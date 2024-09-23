import * as path from 'path';
import * as fs from 'fs';
import { Cliente } from '../../../../domain/entities/cliente';

export class ClientesRepository {
  private readonly filePath = path.resolve(
    'src/infrastructure/persistence/data/clientes.json',
  );

  readClientes(): Cliente[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Cliente[];
  }

  writeClientes(clientes: Cliente[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(clientes, null, 2), 'utf8');
  }
}
