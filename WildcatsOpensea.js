"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.WildcatsOpensea = void 0;
var web3_1 = __importDefault(require("web3"));
var abi_json_1 = __importDefault(require("./abi.json"));
var node_1 = __importDefault(require("moralis/node"));
var WildcatsOpensea = /** @class */ (function () {
    function WildcatsOpensea(provider, account, contract_address, token_id) {
        this.limit = 100;
        this.null_address = "0x0000000000000000000000000000000000000000";
        this.contract_address = contract_address;
        this.web3 = new web3_1["default"](provider);
        this.account = account;
        this.token_id = token_id;
        this.smart_contract = new this.web3.eth.Contract(abi_json_1["default"], this.contract_address);
        this.endpoint = { serverUrl: "undefined", appId: "undefined" };
    }
    WildcatsOpensea.prototype.setMoralis = function (_serverUrl, _appId) {
        this.endpoint = { serverUrl: _serverUrl, appId: _appId };
    };
    WildcatsOpensea.prototype.getTransactions = function (seconds) {
        return __awaiter(this, void 0, void 0, function () {
            var number_of_transaction, transactions, lower_time_limit, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        number_of_transaction = 0;
                        return [4 /*yield*/, this.getAccountTransactions()];
                    case 1:
                        transactions = _a.sent();
                        lower_time_limit = new Date().getTime() - seconds * 1000;
                        //console.log("now : " + lower_time_limit) ;
                        for (i = 0; i < transactions.length; i++) {
                            //console.log(transactions.result[i].block_timestamp + " spazio " + (new Date(transactions.result[i].block_timestamp)))
                            //console.log(new Date(transactions.result[i].block_timestamp).getTime());
                            if (transactions[i].to_address.toLowerCase() == this.account.toLowerCase()
                                && transactions[i].from_address != this.null_address
                                && new Date(transactions[i].timestamp).getTime() > lower_time_limit)
                                number_of_transaction++;
                        }
                        return [2 /*return*/, number_of_transaction];
                }
            });
        });
    };
    WildcatsOpensea.prototype.getAccountTransactions = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var transactions, filtered_transactions, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getTransactionsRaw()];
                    case 1:
                        transactions = _c.sent();
                        filtered_transactions = new Array();
                        //console.log("now : " + lower_time_limit) ;
                        for (i = 0; transactions.result[i] != undefined; i++) {
                            if ((transactions.result[i].token_address.toLowerCase() == this.contract_address.toLowerCase()
                                && this.token_id == BigInt(transactions.result[i].token_id))
                                && (transactions.result[i].to_address.toLowerCase() == this.account.toLowerCase()
                                    || transactions.result[i].to_address.toLowerCase() == this.account.toLowerCase()))
                                filtered_transactions.push({ timestamp: transactions.result[i].block_timestamp,
                                    to_address: transactions.result[i].to_address.toLowerCase(),
                                    from_address: (_b = (_a = transactions.result[i].from_address) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : this.null_address });
                        }
                        return [2 /*return*/, filtered_transactions];
                }
            });
        });
    };
    WildcatsOpensea.prototype.getTransactionsRaw = function () {
        return __awaiter(this, void 0, void 0, function () {
            var number_of_transaction, config, transactions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.endpoint.serverUrl == "undefined" || this.endpoint.appId == "undefined") {
                            throw ("Endopoint not setted. Call the function setMoralis(serverUrl, appId)");
                        }
                        node_1["default"].start(this.endpoint);
                        number_of_transaction = 0;
                        config = {
                            chain: this.chain,
                            address: this.account,
                            limit: this.limit
                        };
                        return [4 /*yield*/, node_1["default"].Web3API.account.getNFTTransfers(config)];
                    case 1:
                        transactions = _a.sent();
                        node_1["default"].removeAllListeners();
                        return [2 /*return*/, transactions];
                }
            });
        });
    };
    WildcatsOpensea.prototype.numberOfAccess = function (seconds) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getBalance()];
                    case 1:
                        _a = (_b.sent());
                        return [4 /*yield*/, this.getTransactions(seconds)];
                    case 2: return [2 /*return*/, _a - (_b.sent())];
                }
            });
        });
    };
    WildcatsOpensea.prototype.getContractAddress = function () {
        return this.contract_address;
    };
    WildcatsOpensea.prototype.getBalance = function () {
        return this.smart_contract.methods.balanceOf(this.account, this.token_id).call();
    };
    WildcatsOpensea.prototype.getUri = function () {
        return this.smart_contract.methods.uri(this.token_id).call();
    };
    return WildcatsOpensea;
}());
exports.WildcatsOpensea = WildcatsOpensea;
