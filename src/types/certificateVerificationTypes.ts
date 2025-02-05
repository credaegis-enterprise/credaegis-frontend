export interface verificationResponseType {
    certificateName: string;
    isIssued: boolean;
    isPublicVerified: boolean;
    merkleRoot: string | null;
    info: CertificateInfo | null;
    infoFound: boolean;
  }
  
  export interface CertificateInfo {
    certificateId: string;
    certificateName: string;
    issuedDate: string;
    recipientName: string;
    recipientEmail: string;
    eventName: string | null;
    clusterName: string;
    organizationName: string;
    revoked: boolean;
    revokedDate: string | null;
    expiryDate: string | null;
    comments: string | null;
  }
  