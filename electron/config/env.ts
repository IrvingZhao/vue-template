import { resolve } from 'path'
import { config } from 'dotenv'

interface Env {
  ENV_PROFILE: string
}

const profile = process.env.profile || 'production'

const envPath = resolve(__dirname, `env/.env.${profile}`)
const loadConfig = config({ path: envPath })

export default function getEnv(): Env | undefined {
  return loadConfig.parsed as Env | undefined
}
