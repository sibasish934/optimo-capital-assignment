function checkEnvVar(value: string | undefined, keyName: string) {
    if (!value) {
        throw new Error(`Could not find ${keyName} in environment variables`);
    }
    return value;
}

export const API_URL = checkEnvVar(
    process.env.NEXT_PUBLIC_API_URL,
    'NEXT_PUBLIC_API_URL'
);
