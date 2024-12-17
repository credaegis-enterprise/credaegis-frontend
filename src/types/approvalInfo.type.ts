
export interface ApprovalInfoType{
    id: string;
    comment: string;
    organizationName: string;
    recipientEmail: string;
    recipientName: string;
    status: "pending" | "approved" | "rejected"; 
    createdOn: string; 
    updatedOn: string; 
    expiryDate: string; 
    eventName: string;
    eventId: string;
    clusterId: string;
    clusterName: string;
    approvalCertificateName: string;
    selected: boolean;
}