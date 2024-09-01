import * as path from 'path';
import * as fs from 'fs';
import { Conta } from 'src/models/Conta.model';

export class ContasRepository {
  private readonly filePath = path.resolve('src/contas/data/contas.json');

  readContas(): Conta[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Conta[];
  }

  writeContas(contas: Conta[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(contas, null, 2), 'utf8');
  }
}
