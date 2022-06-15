// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

interface IERC20 {

    function totalSupply() external view returns(uint256);
    function balanceOf(address account) external view returns(uint256);
    function transfer(address recipient, uint256 amount) external returns(bool);

    //Implementado
    event Transfer(address from, address to, uint256 value);
    event Burn(address owner, uint256 value, uint256 supply);
    event Mint(address owner, uint256 BalanceOwner, uint256 amount, uint256 supply);

    //Não está implementado (ainda)
    //event Approval(address owner, address spender, uint256 value);

}

contract ScamCoin is IERC20 {

     // Enum
    enum Status { PAUSED, ACTIVE, CANCELLED }

    //Properties
    address private owner;
    string public constant name = "ScamCoin";
    string public constant symbol = "SCN";
    uint8 public constant decimals = 3;  //Default dos exemplos é sempre 18
    uint256 private totalsupply;
    Status contractState;
    uint256 valorToken;

    mapping(address => uint256) private addressToBalance;

    // Modifiers
    modifier isOwner() {
        require(msg.sender == owner , "Sender is not owner!");
        _;
    }

 
    //Constructor
    constructor(uint256 total) {
        owner = msg.sender;
        totalsupply = total;
        addressToBalance[msg.sender] = totalsupply;
        contractState = Status.PAUSED;
        valorToken = 1 ether;
    }

    //Public Functions
    function totalSupply() public override view returns(uint256) {
        return totalsupply;
    }

    function balanceOf(address tokenOwner) public override view returns(uint256) {
        return addressToBalance[tokenOwner];
    }

    function transfer(address receiver, uint256 quantity) public override returns(bool) {
        require(quantity <= addressToBalance[msg.sender], "Insufficient Balance to Transfer");
        addressToBalance[msg.sender] -= quantity;
        addressToBalance[receiver] += quantity;

        emit Transfer(msg.sender, receiver, quantity);
        return true;
    }

    function cotacao(uint256 valor) public isOwner {
        valorToken = valor;
    }

    // function valorT(uint256 teste) public view returns(bool){
        
    //     require(valorToken == ether(teste));
    //     return true;
    // }

    function state() public view returns(Status) {
        return contractState;
    }

    function setState(uint8 status) public isOwner {
        require(status == 1 || status == 0, "Invalid status");
        if(status == 1){
            contractState = Status.ACTIVE;
        }else {
            contractState = Status.PAUSED;
        }
   
    }

    function mint(uint256 amount) public isOwner {
        require(contractState == Status.ACTIVE, "Contract is paused!");
        require(amount > 0, "Invalid mint value.");
        
        totalsupply += amount;
        addressToBalance[owner] += amount;
        
        emit Mint(owner,addressToBalance[owner], amount, totalSupply());       
    }


    function burn(uint256 amount) public isOwner {
        require(contractState == Status.ACTIVE, "Contract is paused!");
        require(amount > 0, "Invalid burn value.");
        require(totalSupply() >= amount, "The amount exceeds your balance.");
        totalsupply -= amount;
        addressToBalance[owner] -= amount;

        emit Burn(owner, amount, totalSupply());
    }

    // Kill
    function kill() public isOwner {
        contractState = Status.CANCELLED;
        selfdestruct(payable(owner));
    } 
}