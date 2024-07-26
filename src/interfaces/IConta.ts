import { Cliente } from "src/models/Cliente.model";
import { Conta } from "../models/Conta.model";

export interface IConta {
  numeroDaConta: number;
  cliente: Cliente;
  saldo: number;

  depositar(valor: number): void;
  sacar(valor: number): void;
  transferir(valor: number, contaDestino: Conta): void;
}