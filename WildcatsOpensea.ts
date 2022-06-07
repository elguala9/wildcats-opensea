import Web3 from "web3";
import { Contract } from 'web3-eth-contract';
import ABI from './abi.json'; 
import { AbiItem } from 'web3-utils';
import Moralis from 'moralis/node';

interface structTransaction {timestamp : string, 
    to_address : string,
    from_address : string}
  
interface structEndpoint {serverUrl: string, appId : string}
  
  export class WildcatsOpensea{
      private web3 : Web3;
      private smart_contract : Contract;
      private account : string;
      private contract_address : string;
      private token_id : bigint;
      private endpoint : structEndpoint;
      private chain : "eth" | "rinkeby";
      private limit : number = 100;
      private null_address : string = "0x0000000000000000000000000000000000000000";
  
      constructor(provider : any, account : string, contract_address : string ,token_id : bigint){      

        this.contract_address =  contract_address;
  
        this.web3 = new Web3(provider);
        this.account = account;
        this.token_id = token_id;
        this.smart_contract = new this.web3.eth.Contract(ABI as AbiItem[], this.contract_address);

  
        this.endpoint = {serverUrl: "undefined", appId : "undefined"};
      }
  
      public setMoralis(_serverUrl : string, _appId : string){
        this.endpoint = {serverUrl:_serverUrl, appId : _appId};
      }
  
      public async getTransactions(seconds : number) : Promise<number>{
  
  
        let number_of_transaction : number = 0;
  
        let transactions = await this.getAccountTransactions();
        //console.log(transactions);
        
        var lower_time_limit = new Date().getTime() - seconds*1000;
        
        //console.log("now : " + lower_time_limit) ;
        for(let i : number= 0; i < transactions.length; i++){
  
          //console.log(transactions.result[i].block_timestamp + " spazio " + (new Date(transactions.result[i].block_timestamp)))
          //console.log(new Date(transactions.result[i].block_timestamp).getTime());
          if(transactions[i].to_address.toLowerCase() == this.account.toLowerCase()
            && transactions[i].from_address != this.null_address
            && new Date(transactions[i].timestamp).getTime() > lower_time_limit)
              number_of_transaction++;
        }
        return number_of_transaction;
      }
  
      public async getAccountTransactions() : Promise<Array<structTransaction>>{
        let transactions = await this.getTransactionsRaw();
        let filtered_transactions: Array<structTransaction> = new Array<structTransaction>();
        //console.log("now : " + lower_time_limit) ;
        for(let i : number= 0; transactions.result[i] != undefined; i++){
          if((transactions.result[i].token_address.toLowerCase() == this.contract_address.toLowerCase()
            && this.token_id == BigInt(transactions.result[i].token_id))
            && (transactions.result[i].to_address.toLowerCase() == this.account.toLowerCase()
            || transactions.result[i].to_address.toLowerCase() == this.account.toLowerCase()))         
              filtered_transactions.push({timestamp : transactions.result[i].block_timestamp, 
                                          to_address : transactions.result[i].to_address.toLowerCase(),
                                          from_address : transactions.result[i].from_address?.toLowerCase() ?? this.null_address} );
        }
        return filtered_transactions;
      }
  
  
      public async getTransactionsRaw(){
        if(this.endpoint.serverUrl == "undefined" || this.endpoint.appId == "undefined"){
          throw("Endopoint not setted. Call the function setMoralis(serverUrl, appId)");
        }
  
        Moralis.start(this.endpoint);
        let number_of_transaction : number = 0;
        const config = {
          chain: this.chain,
          address: this.account,
          limit: this.limit
        }
        //console.log(config);
        let transactions = await Moralis.Web3API.account.getNFTTransfers(config);
        
        Moralis.removeAllListeners();
        return transactions;
      }

      public async numberOfAccess(seconds : number) : Promise<number>{
        return (await this.getBalance()) - (await this.getTransactions(seconds));
      }

      public getContractAddress(){
        return this.contract_address;
      }

      public getBalance(): Promise<number> {
        return this.smart_contract.methods.balanceOf(this.account, this.token_id).call();
      }

      public getUri(){
        return this.smart_contract.methods.uri(this.token_id).call();
      }
    }