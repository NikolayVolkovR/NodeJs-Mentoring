const permissionRegex = "('READ'|'WRITE'|'DELETE'|'SHARE'|'UPLOAD_FILES')";

export const groupSchema = {
    properties: {
        name: {
            type: "string",
        },
        permissions: {
            type: "string",
            pattern: `^\\[${permissionRegex}{1,}(,${permissionRegex})*\\]$`,
            flags: "gi",
            errorMessage: "Permissions should be an array [READ|WRITE|DELETE|SHARE|UPLOAD_FILES]",
        },
    },
};

export const groupCreateSchema = {
    required: ["name", "permissions"],
    ...groupSchema,
};

export const groupUpdateSchema = {
    ...groupSchema,
};
