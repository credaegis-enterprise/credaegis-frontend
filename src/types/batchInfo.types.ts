

export interface BatchInfoType {
    hashes : String []
    batchInfo: BatchInfo
    isCurrentBatch: Boolean;
}


interface BatchInfo {
    batchId : String,
    merkleRoot : String,
    hashCount : String,
    pushTime : String,
    txnHash: String,
    txnFee: String,
    pushStatus: boolean,
    createdOn: String,
    updatedOn: String

}