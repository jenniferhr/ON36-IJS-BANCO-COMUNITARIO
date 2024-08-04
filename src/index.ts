// import { ContaCorrente } from './models/ContaCorrente.model';
// import { ContaPoupanca } from './models/ContaPoupanca.model';
// import { Gerente } from './models/Gerente.model';

//cria Gerente
// const gerenteCesar = new Gerente('Cesar Santos');

// //Cria Cliente novo
// const clientePedro = gerenteCesar.criarCliente(
//   'Pedro Alves',
//   'Rua das Bananas, 199, São Paulo',
//   '11987356426',
//   'pedrosilva@gmail.com',
//   '27-07-1997',
//   '123.456.789-01',
// );
// console.log(clientePedro.gerente);

// // Cria contas para o cliente
// const contaCorrentePedro = new ContaCorrente(123, clientePedro, 200);
// const ContaPoupancaPedro = new ContaPoupanca(987, clientePedro, 2);

// // // Adiciona contas ao cliente
// clientePedro.adicionarConta(contaCorrentePedro);
// clientePedro.adicionarConta(ContaPoupancaPedro);

// Testes:
// console.log(clientePedro);
// console.log('saldo inicial', contaCorrentePedro.saldo)
// contaCorrentePedro.depositar(300)
// console.log('saldo após depósito', contaCorrentePedro.saldo)
// contaCorrentePedro.sacar(150)
// console.log('saldo após saque', contaCorrentePedro.saldo)
// contaCorrentePedro.transferir(100, ContaPoupancaPedro)
// console.log(contaCorrentePedro.saldo, ContaPoupancaPedro.saldo)
