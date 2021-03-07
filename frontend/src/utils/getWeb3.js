/*
* 1. Check for injected web3 (mist/metamask)
* 2. If metamask/mist create a new web3 instance and pass on result
* 3. Get networkId - Now we can check the user is connected to the right network to use our dApp
* 4. Get user account from metamask
* 5. Get user balance
*/

import Web3 from "web3";

let getWeb3 = async () => {
    let ethereum = window.ethereum;
    if (typeof ethereum == 'undefined') {
        throw new Error('Unable to connect to Metamask');
    }
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    return {
        injected: ethereum.isConnected(),
        account: accounts[0],
        short_account: accounts[0].substring(0, 10) + '...',
        web3: new Web3(ethereum),
    }
}

export default getWeb3