// SPDX-License-Identifier: MIT
// pragma solidity ^0.5.1;
pragma solidity ^0.6.0;

import "@nomiclabs/buidler/console.sol";

contract Phishable {

    address public owner;

    constructor (address _owner) public {
        owner = _owner;
    }

    function withdrawAll(address payable _recipient) public {

        console.log("Info@Phishable.sol::withdrawAll Invok withdraw tx.origin(%s) owner(%s)",
                            tx.origin,
                            owner );

        require(tx.origin == owner, "Err Invalid Owner");
        _recipient.transfer( address(this).balance );

    }

    receive( ) external payable  {} // collect ether

    fallback () external payable {} // collect ether

}
