export const environment = {
    production: true,
    apiUrlRoot: '',
    apiUrl: {
        userprofile: '', organization: '', role: '', common: '', authentication: '', product: ''
    },
    apiPrefix: {
        userLogin: '/login',
        refreshToken: '/refresh-token'
    },
    frontEndUrl: {
        login: "login",
        organizations: "organizations",
        roles: "roles",
        users: "users",
        courses: "courses",
        feeds: "feeds",
        classes: "classes",
        registrations: "registrations",
        settings: "settings",
        subjects: "subjects",
        periods: "periods"
    },
    appVersion: "1.0.0-SNAPSHOT",
    appClientId: "corefinance-ADMIN-WEB",
    pageSize: 25,
    pageSizeOptions: [25, 50, 100],
    loginRefreshInterval: 15 * 60 * 1000,
};
