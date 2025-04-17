const permissions = {
    admin: {
        create: true,
        edit: true,
        delete: true,
        view: true,
    },
    user: {
        create: false,
        edit: true,
        delete: false,
        view: true,
    },
};

export const checkPermission = (role: string) => {
    return permissions[role] || permissions.user;
}; 