/*
    This file is part of qkc3.js.

    qkc3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    qkc3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with qkc3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file eth.js
 * @author Marek Kotewicz <marek@ethdev.com>
 * @author Fabian Vogelsteller <fabian@ethdev.com>
 * @date 2015
 */

"use strict";

var formatters      = require('../formatters');
var IsSyncing       = require('../syncing');
var Property        = require('../property');
var transfer        = require('../transfer');
var Contract        = require('../contract');
var namereg         = require('../namereg');
var watches         = require('./watches');
var Method          = require('../method');
var Filter          = require('../filter');
var utils           = require('../../utils/utils');
var Iban            = require('../iban');
var c               = require('../../utils/config');


function Qkc(qkc3) {


    this._requestManager = qkc3._requestManager;

    var self = this;

    methods().forEach(function(method) {
        method.attachToObject(self);
        method.setRequestManager(self._requestManager);
    });

    properties().forEach(function(p) {
        p.attachToObject(self);
        p.setRequestManager(self._requestManager);
    });


    this.iban = Iban;
    this.sendIBANTransaction = transfer.bind(null, this);
}

Object.defineProperty(Qkc.prototype, 'defaultBlock', {
    get: function () {
        return c.defaultBlock;
    },
    set: function (val) {
        c.defaultBlock = val;
        return val;
    }
});

Object.defineProperty(Qkc.prototype, 'defaultAccount', {
    get: function () {
        return c.defaultAccount;
    },
    set: function (val) {
        c.defaultAccount = val;
        return val;
    }
});

var methods = function () {
    var getAccountData = new Method({
        name: 'getAccountData',
        call: 'getAccountData',
        params: 2,
        inputFormatter: [formatters.inputAddressFormatter, formatters.inputDefaultBooleanFormatter ],
        // outputFormatter: formatters.outputBigNumberFormatter
    });

    var getBalance = new Method({
        name: 'getBalance',
        call: 'getBalance',
        params: 1,
        inputFormatter: [formatters.inputAddressFormatter],
    });

    var getCode = new Method({
        name: 'getCode',
        call: 'getCode',
        params: 1,
        inputFormatter: [formatters.inputAddressFormatter]
    });

    var getTransactionReceipt = new Method({
        name: 'getTransactionReceipt',
        call: 'getTransactionReceipt',
        params: 1,
        outputFormatter: formatters.outputTransactionReceiptFormatter
    });

    var getTransactionCount = new Method({
        name: 'getTransactionCount',
        call: 'getTransactionCount',
        params: 1,
        inputFormatter: [formatters.inputDefaultBlockNumberFormatter],
        // outputFormatter: utils.toDecimal
    });

    var sendTransaction = new Method({
        name: 'sendTransaction',
        call: 'sendTransaction',
        params: 1,
        inputFormatter: [formatters.inputTransactionFormatter]
    });

    var call = new Method({
        name: 'call',
        call: 'eth_call',
        params: 2,
        inputFormatter: [formatters.inputCallFormatter]
    });

    return [
        getAccountData,
        getBalance,
        getCode,
        getTransactionReceipt,
        getTransactionCount,
        call,
        sendTransaction
    ];
};

var properties = function () {
    return [
        new Property({
            name: 'coinbase',
            getter: 'eth_coinbase'
        }),
        new Property({
            name: 'mining',
            getter: 'eth_mining'
        }),
        new Property({
            name: 'hashrate',
            getter: 'eth_hashrate',
            outputFormatter: utils.toDecimal
        }),
        new Property({
            name: 'syncing',
            getter: 'eth_syncing',
            outputFormatter: formatters.outputSyncingFormatter
        }),
        new Property({
            name: 'gasPrice',
            getter: 'eth_gasPrice',
            outputFormatter: formatters.outputBigNumberFormatter
        }),
        new Property({
            name: 'accounts',
            getter: 'eth_accounts'
        }),
        new Property({
            name: 'blockNumber',
            getter: 'eth_blockNumber',
            outputFormatter: utils.toDecimal
        }),
        new Property({
            name: 'protocolVersion',
            getter: 'eth_protocolVersion'
        })
    ];
};

Qkc.prototype.contract = function (abi) {
    var factory = new Contract(this, abi);
    return factory;
};

Qkc.prototype.filter = function (options, callback, filterCreationErrorCallback) {
    return new Filter(options, 'eth', this._requestManager, watches.eth(), formatters.outputLogFormatter, callback, filterCreationErrorCallback);
};

Qkc.prototype.namereg = function () {
    return this.contract(namereg.global.abi).at(namereg.global.address);
};

Qkc.prototype.icapNamereg = function () {
    return this.contract(namereg.icap.abi).at(namereg.icap.address);
};

Qkc.prototype.isSyncing = function (callback) {
    return new IsSyncing(this._requestManager, callback);
};

module.exports = Qkc;
