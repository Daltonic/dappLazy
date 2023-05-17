//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Lazy is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private totalItems;

    struct NFTStruct {
        string name;
        string description;
        string imageUrl;
        uint tokenId;
        address owner;
        uint price;
    }

    uint listingPrice = 0.02 ether;
    mapping(uint => NFTStruct) collection;

    constructor() ERC721("Lazy Coin", "LZC") {}

    function mint(
        string memory name,
        string memory description,
        string memory imageUrl,
        uint price
    ) public payable {
        require(msg.value >= listingPrice, "Insufficient amount");
        require(price >= 0 ether, "price cannot be empty");
        require(bytes(name).length > 0, "name cannot be empty");
        require(bytes(description).length > 0, "description cannot be empty");
        require(bytes(imageUrl).length > 0, "imageUrl cannot be empty");

        totalItems.increment();
        uint tokenId = totalItems.current();
        _mint(msg.sender, tokenId);


        NFTStruct memory item;
        item.tokenId = tokenId;
        item.name = name;
        item.description = description;
        item.imageUrl = imageUrl;
        item.price = price;
        item.owner = msg.sender;

        collection[tokenId] = item;
    }

    function getNFTs() public view returns (NFTStruct[] memory NFTs) {
        NFTs = new NFTStruct[](totalItems.current());

        for (uint i = 0; i < totalItems.current(); i++) {
            NFTs[i] = collection[i + 1];
        }
    }
}