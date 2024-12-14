export interface Role {
    id: string;
    role: string;
}

export interface UserInfo {
    id: string;
    username: string;
    email: string;
    mfaEnabled: boolean;
    profileUrl: string | null;
    deactivated: boolean;
    deleted: boolean;
    adminCluster: string | null;
    role: Role;
    createdOn: string; 
}

export interface OrganizationInfo {
    id: string;
    name: string;
    address: string;
    pincode: string;
}

export interface AccountInfoType{
    userInfo: UserInfo;
    organizationInfo: OrganizationInfo;
}
