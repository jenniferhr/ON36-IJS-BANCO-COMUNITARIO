import * as path from 'path';
import * as fs from 'fs';
import { Gerente } from 'src/models/Gerente.model';

export class GerenteRepository {
  private readonly filePath = path.resolve('src/gerente/data/gerentes.json');

  readGerentes(): Gerente[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Gerente[];
  }

  writeGerentes(gerentes: Gerente[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(gerentes, null, 2), 'utf8');
  }
}
