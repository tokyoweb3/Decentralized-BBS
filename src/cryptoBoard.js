var Web3 = require('web3');


//const PROVIDER_NETWORK = "http://localhost:9545";
//Ropsten
const PROVIDER_NETWORK = "https://ropsten.infura.io/"
// Rinkeby
// const PROVIDER_NETWORK = "https://rinkeby.infura.io/";

const CONTRACT_ABI =[
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "messages",
      "outputs": [
        {
          "name": "writerAddress",
          "type": "address"
        },
        {
          "name": "nickName",
          "type": "string"
        },
        {
          "name": "message",
          "type": "string"
        },
        {
          "name": "postTime",
          "type": "uint256"
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
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "getWriterAccount",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getMessageCount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
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
          "name": "_nickName",
          "type": "string"
        },
        {
          "name": "_message",
          "type": "string"
        }
      ],
      "name": "postMessage",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getMessages",
      "outputs": [
        {
          "components": [
            {
              "name": "writerAddress",
              "type": "address"
            },
            {
              "name": "nickName",
              "type": "string"
            },
            {
              "name": "message",
              "type": "string"
            },
            {
              "name": "postTime",
              "type": "uint256"
            }
          ],
          "name": "",
          "type": "tuple[]"
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
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "getMessage",
      "outputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "uint256"
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
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getWriterCount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
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
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "writerAccounts",
      "outputs": [
        {
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
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getWriterAccounts",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "writerAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "nickName",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "message",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "postTime",
          "type": "uint256"
        }
      ],
      "name": "MessageInfo",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    }
  ];

//local
//const CONTRACT_ADDRESS = '0x8f0483125fcb9aaaefa9209d8e9d7b9c8b9fb90f';
//ROPSTEN
//for test use only
//const CONTRACT_ADDRESS = '0x229fa7f3d38f905c2503c8d6d8c952828c9ac59c';
const CONTRACT_ADDRESS = '0xaaecdf8348132bd2b0e12253a5a3211b9331db0e';
//Rinkeby
//const 0x1263451ecf736ba95b94af74ee70aa84eb855294;
let Cryptoboard =  web3.eth.contract(CONTRACT_ABI).at(CONTRACT_ADDRESS);


if (typeof web3 !== 'undefined') { 
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_NETWORK));
    console.log('You need a browser with Metamask installed.');
}

//define postmessage event
let cryptoboardEvent = Cryptoboard.MessageInfo({}, 'latest');

cryptoboardEvent.watch((err, result) => {
  if(!err){
    console.log('New Message Event!');
    get_messages();
  } 
});

//checks which network is being used
web3.version.getNetwork((err, netId) =>{
    switch(netId){
        case "1":
            console.log("Mainnet connected");
            $('#networkStatus').html('Mainnet network.');

            break;
        case "2":
            console.log("This is the deprecated Morden test network.");
            $('#networkStatus').html('Deprecated Morden test network.');

            break;
        case "3":
            console.log('This is the Ropsten test network.');
            $('#networkStatus').html('Ropsten test network.');
            // var CONTRACT_ADDRESS = '0xaaecdf8348132bd2b0e12253a5a3211b9331db0e';

            // if(web3.isConnected()) {
            //     web3.eth.defaultAccount = web3.eth.accounts[0];
            //     console.log("defaultAccount: " + web3.eth.defaultAccount);
            //     $('#address').html('Your address: ' + web3.eth.defaultAccount);
            //}
            break;
        case "4":
            console.log('This is the Rinkeby test network.');
            $('#networkStatus').html('Rinkedby test network.');
            // var CONTRACT_ADDRESS = '0xaaecdf8348132bd2b0e12253a5a3211b9331db0e';
            break;
        case "42":
            console.log('This is the Kovan test network.');
            $('#networkStatus').html('Kovan test network.');

            break;
        default:
            console.log('This is an unknown network.');
            $('#networkStatus').html('An unknown network.');
            break;
    }
});

//checks if defaultAccount is web3.eth.accounts[0]
//if not, defaultAccount will be switched and rerender address and balance
setInterval(()=>{ 
  web3.eth.getAccounts((err, accounts)=>{
    if(web3.eth.defaultAccount !== accounts[0]){
      web3.eth.defaultAccount = web3.eth.accounts[0];
      $('#address').html('Your address: ' + web3.eth.defaultAccount);
      web3.eth.getBalance(web3.eth.defaultAccount, (err, result)=>{
          if(result){
            let ether_balance = web3.fromWei(result).toNumber();
            $('#balance').html('ETH Balance: ' + ether_balance);
          } else {
            console.error;
          }
      });
      
    }
  });

}, 500);



$('#button').click(function(){

  if(!$('#nickname').val() || !$('#message').val()){
    $('#information').html("Please fill out Nickname and Message").css('background-color', 'rgb(255, 0, 0, 0.5)').fadeIn().delay(6000).fadeOut();
  } else{
    $('#button').removeClass('disabled');

    Cryptoboard.postMessage($('#nickname').val(), $('#message').val(), {from: web3.eth.defaultAccount, gas: 210000, gasPrice: web3.toWei('1', 'gwei')}, (err, res) =>{
        if(err) console.log(err);
        else{
            var submitted = "Message Submitted.    This may take a while to be visible.";
            $('#information').html(submitted).css('background-color','#72f14c').fadeIn().delay(6000).fadeOut();
            $('#txStatus').append('<span> Your tx: ' + res.toString() + ' <br/> </span>');
            console.log("Message Sent.");
            console.log("Nickname:" + $('#nickname').val() + ", Message: " + $('#message').val());
             $('#nickname').val('');
             $('#message').val('');
             web3.eth.getBalance(web3.eth.defaultAccount, (err, result)=>{
              if(result){
                let ether_balance = web3.fromWei(result).toNumber();
                $('#balance').html('ETH Balance: ' + ether_balance);
              } else {
                console.error;
              }
          });
        }
    });
  }
});



let get_messages = ()=>{
  Cryptoboard.getMessageCount((err, result) => {
      let messages_html ='';

      if(result){
        if(parseInt(result.c) > 0){
        for(let i = 0; i < parseInt(result.c[0]); i++){
            setTimeout(Cryptoboard.getMessage(i, (err, res) => {
                if (!err) {
                    let message_html = '<div class="message-list" id=' + i +'>';
                    message_html += '<span id="post-number">'+ (i+1).toString() +' </span>';
                    message_html += '<span id="post-user">' + res[1].toString() + '</span>';
                    message_html += '<span id="post-time">' + ' ' + convertUnixtimeToDate(res[3]).toString() + '</span>';
                    message_html += '<span id="post-address">  ' + res[0].toString() + ' </span>';

                    message_html += '<button class="tip_button" id=' + i + ' onClick="send_tip(this.id); toggleModal();" >Send Tip' + '</button>';
                    message_html += '<p id="post-message">' + res[2].toString() + '</p>';
                    message_html += '</div>'
                    messages_html = message_html + messages_html;
                    if (i === parseInt(result.c[0]) - 1) {
                        $("#display").html(messages_html);
                    }
                }
            }), 100
        )

        }
        } else{
            $('#display').html('There is no message.');
        }

      } else {console.log(err)};
  });
}
get_messages();


let convertUnixtimeToDate = (timestamp) => {
    var d = new Date( timestamp * 1000 );
    var year  = d.getFullYear();
    var month = d.getMonth() + 1;
    var day  = d.getDate();
    var hour = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
    var min  = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
    var sec   = ( d.getSeconds() < 10 ) ? '0' + d.getSeconds() : d.getSeconds();
    let result = year + '/' + month + '/' + day + ' ' + hour + ':' + min + ':' + sec;
    return result;
}

//send_tip

function toggleModal(){
   $('#myModal').css('display', 'block');
}

$('.close-button').click(()=>{
    $('#myModal').css('display', 'none');
});

function send_tip(id){ // not defined?
    Cryptoboard.getWriterAccount(id, (err, account) => {
        if(!err){
            $('#send_to').html('<h2>' + account + '</h2>');

            //send confirm
            $('#confirm_tip').click(()=>{

                if(web3.eth.defaultAccount !== account) {
                    web3.eth.sendTransaction({
                        from: web3.eth.defaultAccount,
                        to: account,
                        value: web3.toWei($('#tip_amount').val(), 'ether'),
                        gasLimit: 21000,
                        gasPrice: 20000000000
                    }, (err, res) => {
                        if (!err) {
                            console.log("tip_tx: " + res);
                            let tip_sent = $('#tip_amount').val() + ' ETH was successfully sent to ' + account;
                            $('#information').html(tip_sent).css('background-color', '#02f113').fadeIn().delay(20000).fadeOut();
                            $('#txStatus').append('<span> Your tx: ' + res.toString() + ' <br/> </span>'); //show tx
                            $('#myModal').css('display', 'none'); //close modal


                        } else {
                            console.log(err);
                        }
                    });
                } else {
                    $('#myModal').css('display', 'none');
                    $('#information').html("You cannot tip yourself").css('background-color', 'rgb(255, 0, 0, 0.5)').fadeIn().delay(3000).fadeOut();
                }

            });



        }
    });
}

