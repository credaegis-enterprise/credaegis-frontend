import exp from "constants";

interface PublicChainInfoType {
  networkName: string;
    networkId: string;
    clientVersion: string;
}


interface CurrentBatchInfoType {
    batchId: string;
    hashes: string[];
    merkleRoot: string;

}


interface  Web3InfoType {
    web3Info: PublicChainInfoType;
    currentBatchInfo: CurrentBatchInfoType;
}

export default Web3InfoType;
