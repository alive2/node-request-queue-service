import { bool, cleanEnv, num, port, str } from 'envalid'

export const Env = cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    TIMEZONE: str(),
    SERVICE_NAME: str(),
    LOG_FORMAT: str(),
    LOG_DIR: str(),
    ORIGIN: str(),
    CREDENTIALS: bool(),
    DB_HOST: str(),
    DB_PORT: num(),
    DB_USER: str(),
    DB_PASSWORD: str(),
    DB_DATABASE: str(),
    REQUEST_TIMEOUT: num(),
    REQUEST_SCHEDULER_CRON: str(),
    REQUEST_MAX_ATTEMPTS_ON_TIMEOUT: num(),
})
