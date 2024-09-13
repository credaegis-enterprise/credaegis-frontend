export interface Event {
  event_ulid: string;
  event_name: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  cluster_ulid: string;
}

export interface FileInfo {
  fileurl: string | null;
  filename: string;
  fileindex: number;
}

export interface filesMetaType {
  id: string;
  name: string;
  email: string;
  expiryDate: string;
  Comment: string;
}
