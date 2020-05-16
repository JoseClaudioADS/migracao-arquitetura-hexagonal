const appEnvs = [
    'DB_HOST',
    'DB_PORT',
    'DB_USER',
    'DB_PASS',
    'DB_DATABASE',
    'URL_API',
];

export default function checkEnvs(): void {
    appEnvs.forEach(myEnv => {
        if (!process.env[myEnv]) {
            throw new Error(`${myEnv} env not found`);
        }
    });
}
