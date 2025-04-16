const permissions = {
    admin: {
        create: true,
        edit: true,
        delete: true,
        view: true,
    },
    user: {
        create: false,
        edit: true, // Can edit their own tasks
        delete: false,
        view: true, // Can view all tasks assigned to them
    },
};

export const checkPermission = (role: string) => {
    return permissions[role] || permissions.user;
}; 