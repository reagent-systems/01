# Configuration

01 reads configuration from environment variables. Each app parses them with a zod schema built on `packages/config`. Local development uses an untracked `.env` copied from `.env.example`. Production values live in Secret Manager.

An invalid environment stops the app at start with an error that names the failing keys, never their values.

## Fields

| Field | Type | Default | Use |
|---|---|---|---|
| `APP_ENV` | `local` \| `staging` \| `prod` | `local` | Selects the environment |
| `LOG_LEVEL` | `debug` \| `info` \| `warn` \| `error` | `info` | Sets log detail |

| `OPS_PASSWORD` | string | unset | `apps/web` only. Password for `/ops`. Unset means `/ops` returns 404 |
| `NEXT_PUBLIC_SITE_URL` | URL | the Vercel production host, else `http://localhost:3000` | `apps/web`. Base for canonical URLs, the sitemap, and structured data. Set it to the real domain |
| `GITHUB_ISSUES_TOKEN` | string | unset | `apps/web`. Fine-grained token with Issues: write. Unset means the forms answer `configured: false` |
| `GITHUB_ISSUES_REPO` | `owner/repo` | `reagent-systems/01` | `apps/web`. Repo that receives form submissions as issues |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | string | unset | `apps/web`. Search Console verification token |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | string | unset | `apps/web`. Bing Webmaster verification token |

Each app adds its own fields in this table when it lands.
