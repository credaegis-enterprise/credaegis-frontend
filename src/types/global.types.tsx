

export interface EventType {
  event_ulid: string;
  event_name: string;
  created_at: string;
  updated_at: string;
  deleted: number;
  deactivated: number;
  cluster_ulid: string;
}

export interface ClusterInfoType {
  cluster_ulid: string;
  cluster_name: string;
  organization_ulid: string;
  created_at: Date;
  updated_at: Date;
  deactivated: number;
  deleted: boolean;
  membersInfo: MemberType[];
  eventsInfo: EventType[];
  adminInfo: AdminType[];
}

export interface MemberType {
  member_ulid: string;
  member_email: string;
  member_name: string;
  deactivated: boolean;
  created_at: Date;
  updated_at: Date;
}

interface AdminType {
  admin_ulid: string;
  admin_email: string;
  admin_name: string;
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
  cluster_name: string;
  selected: boolean;
}

export interface ClusterType {
  cluster_ulid: string;
  cluster_name: string;
  organization_ulid: string;
  created_at: string;
  deactivated: number;
  updated_at: string;
  member_ulid: string;
  cluster_admin_ulid: string;
  deleted: number;
  cluster_admin_email: string;
  cluster_admin_name: string;
}

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

export interface verificationStatusType {
  filename: string;
  isIssued: boolean;
  info?: verificationInfoType;
}

export interface verificationInfoType {
  certificate_ulid: string;
  issued_date: string;
  issued_to_name: string;
  issued_to_email: string;
  expiry_date: string;
  comments?: string;
  certificate_name: string;
  certificate_hash: string;
  revoked: number;
  revoked_date: string | null;
  event_name: string;
  cluster_name: string;
  organization_name: string;
}

export interface issuedCertificatesType {
  certificate_ulid: string;
  approved_by_member_email: string;
  approved_by_organization_email: string;
  issued_date: string;
  issued_to_name: string;
  issued_to_email: string;
  expiry_date: string | null;
  comments: string;
  certificate_name: string;
  revoked: boolean;
  revoked_date: string | null;
  event_name: string;
  cluster_name: string;
  approved_by_organization: string | null;
  approved_by_member: string | null;
  selected: boolean;
}

//settings


export interface MemberSettingType {
  organization_name: string;
  two_fa_enabled: boolean;
  brand_logo_enabled: boolean;
  member_name: string;
  member_email: string;
}

export interface OrganizationSettingType {
  organization_name: string;
  organization_ulid: string;
  organization_email: string;
  two_fa_enabled: boolean;
  brand_logo_enabled: boolean;
}

export interface SettingsType {
    memberAccountInfo: memberAccountInfoType | null;
    organizationAccountInfo: organizationAccountInfoType | null;
    settingsInfo: settingsInfoType;

}

export interface memberAccountInfoType {
  member_ulid: string;
  member_name: string;
  member_email: string;
  cluster_ulid: string;
  cluster_name: string;
  organization_ulid: string;
  organization_name: string;
}

export interface organizationAccountInfoType {
  organization_name: string;
  organization_ulid: string;
  organization_email: string;
}

export interface settingsInfoType {
  two_fa_enabled: boolean;
}
