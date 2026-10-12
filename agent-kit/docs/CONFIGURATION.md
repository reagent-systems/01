# Configuration

01 reads configuration from environment variables. Each app parses them with a zod schema built on `packages/config`. Local development uses an untracked `.env` copied from `.env.example`. Production values live in Secret Manager.

An invalid environment stops the app at start with an error that names the failing keys, never their values.

## Fields

| Field | Type | Default | Use |
|---|---|---|---|
| `APP_ENV` | `local` \| `staging` \| `prod` | `local` | Selects the environment |
| `LOG_LEVEL` | `debug` \| `info` \| `warn` \| `error` | `info` | Sets log detail |

Each app adds its own fields in this table when it lands.
