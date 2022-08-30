import { bool, cleanEnv, port, str } from 'envalid'

export const Env = cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    TIMEZONE: str(),
    SERVICE_NAME: str(),
    LOG_FORMAT: str(),
    LOG_DIR: str(),
    ORIGIN: str(),
    CREDENTIALS: bool(),
})