var firstAccount = '';
var degreeAddr = '';
var ownerAddr = '';
var degreeContract = '';
var ownerContract = '';

const degreeAbi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "hashedDocument",
        "type": "string"
      }
    ],
    "name": "degreeAdded",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "hashedDegree",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_hashedDocument",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_studentFirstname",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_studentLastname",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_degreeType",
        "type": "string"
      }
    ],
    "name": "addHashedDegree",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "targetHash",
        "type": "string"
      }
    ],
    "name": "verifyHashedDegree",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "studentFirstname",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "studentLastname",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "degreeType",
            "type": "string"
          }
        ],
        "internalType": "struct Degree.DegreeInformations",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

const ownerAbi = [
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "Ownable",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

async function loadWeb3() {
  let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  web3.eth.getAccounts().then(account => { 
    firstAccount = account[0];
    degreeAddr = '0xb479028a66924DB57C9dD4C6Ef390833B0f7A618';
    ownerAddr = '0x07998b85eF530A46e0Aa0EE3E9cB3237046A2337';
    degreeContract = new web3.eth.Contract(degreeAbi, degreeAddr);
    ownerContract = new web3.eth.Contract(ownerAbi,  ownerAddr);

    $('#connect').html('Connection succeed !');
  }) 
}

$('#connect').on('click', function() {
  loadWeb3();
});

$('#add').on('click', function() {
    let firstname = $('#firstname').val();
    let lastname = $('#lastname').val();
    let degree_type = $('#degree_type').val();

    let document = $('#degree').val();
    let hashed_degree = keccak256(document);
    console.log(document);

    $('#hash_degree').html(hashed_degree);

    degreeContract.methods.addHashedDegree(hashed_degree, firstname, lastname, degree_type).send({ from: firstAccount , gas: 6721975 }).on('transactionHash', function(hash){
    })
    .on('confirmation', function(confirmationNumber, receipt){
      console.log(receipt);
    })
    .on('receipt', function(receipt){
    })
    .on('error', console.error)

});

$('#verify').on('click', function() {
    let hashed_value = $('#hashed_value').val();
    console.log("hash:" + hashed_value);

    degreeContract.methods.verifyHashedDegree(hashed_value).call().then(function(result, error){
      console.log(result);
    });
});
