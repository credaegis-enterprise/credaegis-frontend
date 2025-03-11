

interface BatchInfoType {
    hashes : String []
    batchInfo: BatchInfo
}


interface BatchInfo {
    id : BigInteger,
    merkleRoot : String,
    hashCount : BigInteger,
    pushTime : String,
    txnHash: String,
    txnFee: String,
    pushStatus: boolean,
    createdOn: String,
    updatedOn: String

}