# 🪙 Scamcoin | Scamswap 🎰

## Sobre o Projeto
Projeto criado durante o curso [Cripto Dev](https://criptodev.corporate.gama.academy/), com o objetivo de criar um MVP de uma vending machine onde possamos comprar e vender tokens com Ether. Utilizando `Soliditiy` e todas as suas tecnologias para desenvolver um `Smart Contract` e disponibiliza-las na rede `Ethereum`.

## 🚀 Como executar
Antes de começar para execultar o projeto é necessário que você tenha o `Node.js` instalado na sua maquina.

Clone o projeto e acesse a pasta do mesmo.
```bash
$ https://github.com/andersondantas81/gamacoin-cryptodev.git
$ cd gamacoin-cryptodev
```
Para iniciá-lo, siga os passos abaixo:
```bash
# Instalar as dependências
$ npm install

# Compilar os contratos
$ npx hardhat compile

# Executar os testes
$ npx hardhat test
```
---

## 📝 Sobre as funcionalidades
### 🪙 Scancoin
Para implantar o contrato do **scancoin** deve ser passado o valor total de tokens (`totalSupply`), o endereço que realizar a implantação será o proprietário do contrato.

Apenas o proprietário do contrato pode:
* Cunhar moedas;
* Queimar moedas (que estejam em sua posse);
* Mudar o estado do contrato;
* Finalizar o contrato;

As seguintes funçoes só pode ser executadas se o contrato estiver com o estado ativo:
* `transfer()`;
* `transferFrom()`;
* `mint()`;
* `burn()`;

O contrato pode realizar as seguintes operações:
* `totalSupply()`: Verifica a quantidade máxima de tokens;
* `balanceOf(account)`: Verifica saldo do endereço informado;
* `transfer(recipient, amount)`: Realiza uma transferência do endereço conectado para o endereço informado com a quantidade de tokens informada;
* `allowance(from, spender)`: Retorna o número restante de tokens que `spender` poderão ser gastos em nome do `owner` no `transferFrom`;
* `approve(spender, amount)`: Define um limite de tokens que pode ser transferidos;
* `transferFrom(sender, recipient, amount)`: Realiza uma transferência uma quantidade de tokens de `from` para `to` ;
* `increaseAllowance(spender, addedValue)`: Aumenta a quantiade permitida de transferencia de tokens concedida ao `spender`;
* `decreaseAllowance(spender, subtractedValue)`: Diminui a quantiade permitida de transferencia de tokens concedida ao `spender`;
* `state()`: Verifica o estado do contrato que pode ser:
  * 0: Paused
  * 1: Active
  * 2: Cancelled
* `mint(amount)`: Realiza a cunhagem da quantidade de tokens informada adicionando ao `totalsupply`;
* `burn(amount)`: Realiza a queima da quantidade de tokens informada diminuindo do `totalsupply`;
* `setState(status)`: Altera o estado de acordo com o número informado;
* `kill()`: Finaliza o contrato;

### 🎰 Scamswap
Para implantar o contrato **scamswap** deve ser passado o endereço do contrato **scamcoin**.

Apenas o proprietário do contrato pode:
* Finalizar o contrato;
* Definir o valor de venda do token;
* Definir o valor de compra do token;
* Reabastecer este contrato com mais ethers;
* Reabastecer este contrato com mais tokens;
* Retirar uma quantidade determinada de ethers deste contrato;
* Retirar todos os ethers deste contrato;
* Gerar o hash para finalizar o contrato;
* Obter o hash para finalizar o contrato;

O contrato pode realizar as seguintes operações:

* `restockEthers`: Reabastecer este contrato com mais ethers;
* `restockTokens`: Reabastecer este contrato com mais tokens;
* `sell`: Vende tokens por ethers;
* `buy`: Compra tokens por ethers;
* `withdrawEthers`: Retirar uma quantidade determinada de ethers deste contrato;
* `withdrawAllEthers`: Retirar todos os ethers deste contrato;
* `setSalesPrice`: Definir o valor de venda do token;
* `setPurchasePrice`: Definir o valor de compra do token;
* `setHashKill`: Gerar o hash para finalizar o contrato;
* `getBalanceTokens`:  Verifica saldo de tokens do contrato;
* `getBalanceTokensForAddress`: Verifica saldo de tokens do endereço informado;
* `getBalanceAddress`: Verifica saldo de ethers do endereço informado;
* `getBalanceEthers`: Verifica saldo de ethers do contrato;
* `getSalesPrice`: Verifica o valor de venda do token;
* `getPurchasePrice`: Verifica o valor de compra do token;
* `getHashKill`: Obter o hash para finalizar o contrato;
* `kill`: Finaliza o contrato;

---
## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Solidity](https://docs.soliditylang.org/en/v0.8.14/)
- [Node.js](https://nodejs.org/en/)
- [Hardhat](https://hardhat.org/)

## 👨‍💻 Membros do projeto
* [Anderson Dantas](https://github.com/andersondantas81)
* [Douglas Melo](https://github.com/Dougmelo)
* [Gabiel Duarte](https://github.com/xlDuarte)
* [Kelwin Ladeira](https://github.com/ladeirakelwin)
* [Vinicius Santana](https://github.com/viniblack)

## 📝 License

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
