const { expect } = require('chai');
const { ethers } = require('hardhat');

// O adminsitrador deve ser capaz de sacar o saldo em ethers
// O administrador deve ser capaz de redefinir o valor dos tokens para compra.
// O administrador deve ser capaz de redefinir o valor dos tokens para venda.
// Não deve ser possivel comprar tokens com valor zero.
// Não deve ser possivel vender tokens com valor zero.
// Não deve ser possivel reabastecer a maquina com tokens com valor zero.
// Não deve ser possivel reabastecer a maquina com ethers com valor zero.

describe('Scam Swap contract', function () {
	let owner, account1, account2, accounts, token, scamSwap;

	beforeEach(async () => {
		[owner, account1, account2, ...accounts] = await ethers.getSigners();

		const ScamCoin = await ethers.getContractFactory('ScamCoin');
		token = await ScamCoin.deploy(10000);
		await token.deployed();

		const ScamSwap = await ethers.getContractFactory('ScamSwap');
		scamSwap = await ScamSwap.deploy(token.address);
		await scamSwap.deployed();
	});

	it('The buyer must be able to buy tokens with ethers.', async function () {
		const companyBox = 1000;
		const transferedValue = 10;
		const restock = await scamSwap.restockTokens(companyBox);
		await restock.wait();

		const transactionOne = await scamSwap
			.connect(account1)
			.purchase(transferedValue, {
				value: ethers.utils.parseEther(String(transferedValue * 2)),
			});

		await transactionOne.wait();

		expect(await token.balanceOf(account1.address)).to.equal(transferedValue);
		expect(await token.balanceOf(scamSwap.address)).to.equal(companyBox - transferedValue);
	});

	it('The seller must be able to sell tokens for ethers.', async function () {
		const companyBox = 1000;
		const transferedValue = 10;
		const restock = await scamSwap.restockTokens(companyBox);
		await restock.wait();

		const purchaseTransaction = await scamSwap
			.connect(account1)
			.purchase(transferedValue, {
				value: ethers.utils.parseEther(String(transferedValue * 2)),
			});

		await purchaseTransaction.wait();

		expect(await token.balanceOf(account1.address)).to.equal(transferedValue);

		const salesTransaction = await scamSwap.connect(account1).sales(transferedValue);
		salesTransaction.wait();

		expect(await token.balanceOf(account1.address)).to.equal(0);
	});

	it('The administrator must be able to replenish the machine with tokens and ethers.', async function () {
		const companyBox = 100;

		const restockTokensScamSwap = await scamSwap.restockTokens(companyBox);
		await restockTokensScamSwap.wait();

		const restockEthersScamSwap = await scamSwap.restockEthers({
			value: ethers.utils.parseEther(String(companyBox)),
		});
		await restockEthersScamSwap.wait();

		expect(await scamSwap.getBalanceTokens()).to.equal(companyBox);
		expect(await scamSwap.getBalanceEthers()).to.equal(companyBox);
	});

	it('The admin must be able to withdraw the balance in ethers', async function () {
		const companyBox = 100;
    const beforeWithdraw = await scamSwap.getBalanceAddress(owner.address)
		const restock = await scamSwap.restockTokens(1000);
		await restock.wait();


		const purchaseTransaction1 = await scamSwap.connect(account1).purchase(companyBox/2, {value: ethers.utils.parseEther(String(companyBox))})
    await purchaseTransaction1.wait();

    const purchaseTransaction2 = await scamSwap.connect(account2).purchase(companyBox/2, {value: ethers.utils.parseEther(String(companyBox))})
    await purchaseTransaction2.wait();

    const purchaseTransaction3 = await scamSwap.connect(accounts[0]).purchase(companyBox/2, {value: ethers.utils.parseEther(String(companyBox))})
    await purchaseTransaction3.wait();
    
    const withdraw1 = await scamSwap.withdrawEthers(owner.address, 50);
    await withdraw1.wait()

    let currentBalanceOwner =  Number(beforeWithdraw) + 50;

    expect(await scamSwap.getBalanceAddress(owner.address)).to.be.equal(currentBalanceOwner)

    const withdraw2 = await scamSwap.withdrawEthers(owner.address, 100);
    await withdraw2.wait()

    currentBalanceOwner = Number(currentBalanceOwner) + 100;

    expect(await scamSwap.getBalanceAddress(owner.address)).to.be.equal(currentBalanceOwner)

    const withdraw3 = await scamSwap.withdrawAllEthers();
    await withdraw3.wait()

    currentBalanceOwner = Number(currentBalanceOwner) + 150;

    expect(await scamSwap.getBalanceAddress(owner.address)).to.be.equal(currentBalanceOwner)

	});
});
