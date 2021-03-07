# bitchariot

## init project
run truffle init

## config network
config in truffle-config.js
`cp truffle-config-eth.js truffle-config.js` to use eth.
`cp truffle-config-bsc.js truffle-config.js` to use bsc.

## deploy compile
truffle compile

## deploy testnet
truffle migrate --network testnet

## reset and deploy testnet
truffle migrate –-reset
truffle migrate --network testnet
