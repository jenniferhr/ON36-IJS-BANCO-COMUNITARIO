import { Cliente } from 'src/models/Cliente.model';
import * as path from 'path';
import * as fs from 'fs';

export class ClientesRepository {
  private readonly filePath = path.resolve('src/clientes/data/clientes.json');

  readClientes(): Cliente[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Cliente[];
  }

  writeClientes(clientes: Cliente[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(clientes, null, 2), 'utf8');
  }
}
