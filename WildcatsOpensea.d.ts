interface structTransaction {
    timestamp: string;
    to_address: string;
    from_address: string;
}
export declare class WildcatsOpensea {
    private web3;
    private smart_contract;
    private account;
    private contract_address;
    private token_id;
    private endpoint;
    private chain;
    private limit;
    private null_address;
    constructor(provider: any, account: string, contract_address: string, token_id: bigint);
    setMoralis(_serverUrl: string, _appId: string): void;
    getTransactions(seconds: number): Promise<number>;
    getAccountTransactions(): Promise<Array<structTransaction>>;
    getTransactionsRaw(): Promise<{
        total: number;
        page: number;
        page_size: number;
        cursor: string;
        result: {
            token_address: string;
            token_id: string;
            from_address?: string;
            to_address: string;
            value?: string;
            amount?: string;
            contract_type: string;
            block_number: string;
            block_timestamp: string;
            block_hash: string;
            transaction_hash: string;
            transaction_type?: string;
            transaction_index?: string;
            log_index: number;
            operator?: string;
        }[];
        block_exists?: boolean;
        index_complete?: boolean;
    } & import("moralis/types/generated/web3Api").defaultResponse<{
        total: number;
        page: number;
        page_size: number;
        cursor: string;
        result: {
            token_address: string;
            token_id: string;
            from_address?: string;
            to_address: string;
            value?: string;
            amount?: string;
            contract_type: string;
            block_number: string;
            block_timestamp: string;
            block_hash: string;
            transaction_hash: string;
            transaction_type?: string;
            transaction_index?: string;
            log_index: number;
            operator?: string;
        }[];
        block_exists?: boolean;
        index_complete?: boolean;
    }>>;
    numberOfAccess(seconds: number): Promise<number>;
    getContractAddress(): string;
    getBalance(): Promise<number>;
    getUri(): any;
}
export {};
