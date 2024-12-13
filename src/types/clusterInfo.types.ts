export interface AdminInfoType {
    id: string;
    name: string;
    email: string;
}

export interface EventInfoType {
    id: string;
    name: string;
    description: string;
    deactivated: boolean;
    createdOn: string; 
}

export interface MemberInfoType {
    id: string;
    username: string;
    email: string;
    deactivated: boolean;
    createdOn: string;
}

export interface ClusterInfoType {
    id: string;
    name: string;
    locked: boolean;
    deactivated: boolean;
    createdOn: string; 
}



export default interface ClusterDetailsResponseType {
    clusterInfo: ClusterInfoType;
    adminInfo: AdminInfoType;
    events: EventInfoType[];
    members: MemberInfoType[];
}
