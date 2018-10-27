# QuarkChain JavaScript API

QuarkChain’s client library is built around web3.js which is the Javascript-based client library for [Quarkchain JSON RPC](https://developers.quarkchain.io/#json-rpc).  


#Description 
The current client library quarkchain-web3.js ( https://github.com/QuarkChain/quarkchain-web3.js ) is built around web3.js without modifying the source code of web3.js. This is a quick hack to get a working client library with basic features. But in the long run we would like to have a client library that built upon the native QuarkChain JSON RPCs as described in https://developers.quarkchain.io/#json-rpc . This task is to build this client library in JavaScript with at least the same features provided in quarkchain-web3.js. 
The new library should use native QuarkChain RPCs rather than the eth* ones. 
The lastest RPC interfaces can be found in https://github.com/QuarkChain/pyquarkchain/blob/master/quarkchain/cluster/jsonrpc.py . Note that in most cases the interfaces of the client library should be the same as web3.js ( https://github.com/ethereum/wiki/wiki/JavaScript-API ). 
Since the eth APIs only accept ETH address (20 bytes) while the QKC address is (24 bytes), quarkchain-web3.js APIs do not have a block identifier parameter ( https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethdefaultblock ) as it passes the shard id to the eth_ APIs through the block identifier parameter. However, the new client library should be able to take block identifier as a parameter since the native RPCs accept QKC address. Your submission will be judged on feature completeness and code quality. 
Implementing additional features that are not in quarkchain-web3.js but available in web3.js will get bonus points.


#Implemented methods



[Documentation](https://github.com/ethereum/wiki/wiki/JavaScript-API)



## Contribute!

### Requirements

* Node.js
* npm

```bash
# On Linux:
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
sudo apt-get install nodejs-legacy
```

### Building (gulp)

```bash
npm run-script build
```

### Testing (mocha)

```bash
npm test
```




## License

[LGPL-3.0+](LICENSE.md) © 2015 Contributors
