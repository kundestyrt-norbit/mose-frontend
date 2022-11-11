module.exports = {
    env: {
        ACCESS_KEY_ID_AWS: process.env.ACCESS_KEY_ID_AWS,
        SECRET_ACCESS_KEY_AWS: process.env.SECRET_ACCESS_KEY_AWS,
        COOKIE_STORAGE_DOMAIN: process.env.COOKIE_STORAGE_DOMAIN,
        COOKIE_STORAGE_SECURE: process.env.COOKIE_STORAGE_SECURE,
        AUTH_POOL: process.env.AUTH_POOL,
        AUTH_REGION: process.env.AUTH_REGION,
        AUTH_POOL_CLIENT: process.env.AUTH_POOL_CLIENT,
        USER_DB_TABLE_NAME: process.env.USER_DB_TABLE_NAME,
        ACCESS_KEY_ID_DYNAMO_DB_AWS: process.env.ACCESS_KEY_ID_DYNAMO_DB_AWS,
        SECRET_ACCESS_KEY_DYNAMO_DB_AWS: process.env.SECRET_ACCESS_KEY_DYNAMO_DB_AWS,
        BASE_URL: process.env.BASE_URL,
        AUTH_REDIRECT: process.env.AUTH_REDIRECT,
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/dashboard',
                permanent: false,
            }]
    }
}