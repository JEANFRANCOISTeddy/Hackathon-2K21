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
        "constant": false,
        "inputs": [],
        "name": "Ownable",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
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
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
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
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
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
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "internalType": "string",
            "name": "_hashedDocument",
            "type": "string"
          }
        ],
        "name": "viewDegree",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }  
];

const ownerAbi = [
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "Ownable",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
]

async function loadWeb3() {
  let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  web3.eth.getAccounts().then(account => { 
    firstAccount = account[0];
    degreeAddr = '0x949DE87F1fE8324342b5A552e61E40569879C586';
    ownerAddr = '0x9468Fa31Dedb80c56469Ef3258BC83634d98d530';
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
    let hashed_degree = keccak512(document);

    $('#hash_degree').html(hashed_degree);

    degreeContract.methods.addHashedDegree(hashed_degree, firstname, lastname, degree_type).send({ from: firstAccount }).on('transactionHash', function(hash){
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

    degreeContract.methods.verifyHashedDegree(hashed_value).call().then(function(result){
      console.log(result);
    });
});
