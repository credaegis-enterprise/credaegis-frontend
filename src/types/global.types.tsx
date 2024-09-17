export interface EventType {
  event_ulid: string;
  event_name: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  cluster_ulid: string;
}


export interface ApprovalsType {

    approval_ulid: string;
    approval_file_ulid: string;
    approval_file_name: string;
    comments: string;
    expiry_date: string;
    issued_to_name: string;
    issued_to_email: string;
    event_name: string;
    event_ulid: string;
    cluster_ulid: string;
    selected: boolean;
}


export interface ClusterType  {
    cluster_ulid: string;
    cluster_name: string;
    organization_ulid: string;
    created_at: string;
    deactivated: number;
    updated_at: string;
    member_ulid: string;
    deleted: number;
    member_email: string;
    member_password: string;
    member_name: string;
  };

export interface FileInfo {
  fileurl: string | null;
  filename: string;
  fileindex: string;
}

export interface filesMetaType {
  id: string;
  filename: string;
  name: string;
  email: string;
  expiryDate: string;
  Comment: string;
}

export interface MyFileType extends File {
    id: string;
}



