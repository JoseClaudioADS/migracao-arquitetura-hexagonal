export function isDev(): boolean {
    return process.env.NODE_ENV?.toLowerCase() === 'dev';
}

export function isProd(): boolean {
    return process.env.NODE_ENV?.toLowerCase() === 'prod';
}

export function isTest(): boolean {
    return process.env.NODE_ENV?.toLowerCase() === 'test';
}
