import builder from '../Blockchain/Builder.js'; 

let web3; 

if(typeof window !== "undefined" && typeof window.ethereum !== "underfined"){
    web3 = new Web3(window.ethereum); 
} /*else {
    const provider  = "ws://localhost:7545"; 
    web3 = new Web3(provider); 
}*/

const instance = new web3.eth.Contract(builder.abi, '0x3449E42DA094Bd7C333e7004Ee04d6f3C3BA067E'); 

export { web3, instance };