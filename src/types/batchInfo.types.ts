

export interface BatchInfoType {
    hashes : string [],
    batchInfo: BatchInfo | null,
    isCurrentBatch: boolean,
    merkleRoot: string
}


interface BatchInfo {
    batchId : string,
    merkleRoot : string,
    hashCount : string,
    pushTime : string,
    txnHash: string,
    txnFee: string,
    pushStatus: boolean,
    createdOn: string,
    updatedOn: string
    txnUrl: string,
    publicChainId: string,
    publicChainName: string

}