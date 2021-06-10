pragma solidity ^0.8.0;

import "./Owner.sol";

contract Degree is Owner {
    
    event degreeAdded(string hashedDocument);

    struct DegreeInformations {
        string studentFirstname;
        string studentLastname;
        string degreeType;
    }

    mapping(string => DegreeInformations) listInformations;
    string[] public hashedDegree;

    function addHashedDegree(string memory _hashedDocument, string memory _studentFirstname, string memory _studentLastname, string memory _degreeType) public onlyOwner {
        DegreeInformations memory informations = DegreeInformations(_studentFirstname, _studentLastname, _degreeType);
        listInformations[_hashedDocument] = informations;
        hashedDegree.push(_hashedDocument);
        emit degreeAdded(_hashedDocument);
    }

    function verifyHashedDegree(string memory targetHash) public view returns(bool) {
        bytes32 hashBytes = keccak256(abi.encodePacked(targetHash) );
        for(uint i = 0; i <hashedDegree.length; i++){
            if(keccak256(abi.encodePacked(hashedDegree[i])) == hashBytes ){
                return true;
                //return listInformations[targetHash];
            }
        }  

        return false;
        //return DegreeInformations("fail", "fail", "fail");
    }
    
    function viewDegree(string memory _hashedDocument) public view returns (string memory, string memory, string memory)  {
        return (listInformations[_hashedDocument].studentFirstname, listInformations[_hashedDocument].studentLastname, listInformations[_hashedDocument].degreeType );
    }
    
}
