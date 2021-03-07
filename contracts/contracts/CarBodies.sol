
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CarBodies is ERC721 {
    using SafeMath for uint;

    struct CarBody {
        // blood dna
        uint dna;
        uint tokenId;
    }
    uint public tokenIndex = 1000000000;
    uint public pricePerNFT = 10 finney;
    // only one property
    uint public dnaModule = 10**2;
    mapping(uint => CarBody) public carBodyMapByTokenId;

    constructor () ERC721("CarBody", "CBT") public {
        _setBaseURI("http://nft.freepie.com/carbody/");
    }

    function setURIPrefix(string memory baseURI) public {
        _setBaseURI(baseURI);
    }

    function fetch(uint number) public payable {
        // check value is enough
        require(
            msg.value > pricePerNFT.mul(number),
            "There already is a higher bid."
        );
        uint dna = block.number.mul(msg.value).mod(dnaModule);
        uint tokenId = tokenIndex;
        tokenIndex = tokenIndex.add(1);
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, Strings.toString(tokenId));
        carBodyMapByTokenId[tokenId] = CarBody(dna, tokenId);
        // event fetch
    }
}
