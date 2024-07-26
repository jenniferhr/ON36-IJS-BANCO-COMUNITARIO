import { Conta } from "../models/Conta.model";

export interface IConta {
  numeroDaConta: number;
  idCliente: number;
  saldo: number;

  depositar(valor: number): void;
  sacar(valor: number): void;
  transferir(valor: number, contaDestino: Conta): void;
}