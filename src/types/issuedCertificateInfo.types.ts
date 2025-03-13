export interface  CertificateInfoType  {
  id: string;
  selected: boolean;
  issuerName: string;
  issuerEmail: string;
  comments: string | null;
  expiryDate: string | null;
  clusterName: string;
  eventName: string;
  revoked: boolean;
  persisted: boolean;
  issuedDate: string;
  revokedDate: string | null;
  certificateName: string;
  recipientEmail: string;
  recipientName: string;
    status: string;
  };
  