// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract CafeContract is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    struct MenuItem {
        string name;
        uint256 price;
    }

    // __gap[50]: initalize
    mapping(uint256 => MenuItem) internal menu;
    uint256 internal menuCount;

    // __gap[49]
    // Let's de-comment and upgrade the contract 👇
    // string cafeName;

    function initialize() public initializer {
        __Ownable_init();
        menuCount = 0;
        // Let's de-comment and upgrade the contract 👇
        // cafeName = "Boilerplate";
    }

    function addMenuItem(MenuItem memory menuItem) public virtual onlyOwner {
        menu[menuCount] = menuItem;
        menuCount++;
    }

    function getMenuItem(
        uint256 id
    ) public view virtual returns (MenuItem memory) {
        require(id < menuCount, "Menu item does not exist");
        MenuItem memory item = menu[id];
        return item;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    /** V2 */
    function updateMenuItemPrice(
        uint256 id,
        uint256 newPrice
    ) public onlyOwner {
        require(id < menuCount, "Menu item does not exist");
        menu[id].price = newPrice;
    }

    /** V3 */
    function deleteMenuItem(uint256 id) public onlyOwner {
        require(id < menuCount, "Menu item does not exist");

        for (uint256 i = id; i < menuCount - 1; i++) {
            menu[i] = menu[i + 1];
        }
        delete menu[menuCount - 1];

        menuCount--;
    }

    // If you have added variables, you should adjust the __gap value. [50] -> [49]
    uint256[50] private __gap;
}
