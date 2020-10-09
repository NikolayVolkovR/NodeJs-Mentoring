export type GroupPermission = "READ" | "WRITE" | "DELETE" | "SHARE" | "UPLOAD_FILES";

// todo make correct types (as at Sequelize documentation)

export interface Group {
    name: string;
    permissions: GroupPermission[];
}

export interface GroupCreateProps {
    name: string;
    permissions: string;
}

export interface GroupUpdateProps {
    name?: string;
    permissions?: string;
}
