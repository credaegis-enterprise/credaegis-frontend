

export interface BatchInfoType {
    hashes : string []
    batchInfo: BatchInfo
    isCurrentBatch: boolean
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

}