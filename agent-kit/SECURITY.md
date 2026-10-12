# SECURITY.md

- Report vulnerabilities privately through GitHub Security Advisories
  ("Report a vulnerability" on the Security tab of `reagent-systems/01`).
  **Never open a public issue for a vulnerability.**
- Acknowledgment within 72 hours; fix-or-plan within 14 days;
  coordinated disclosure after a fix ships.
- Supported: latest minor release, unless stated otherwise.
- Secrets never enter the repo — not code, config, fixtures, or history.
  CI uses Actions secrets; production keys live in Secret Manager; local
  dev uses an untracked `.env` with a committed `.env.example`.
- Export control: the platform blocks ITAR-marked uploads. Reagent
  Defense work does not run here.
- For the agent: security-shaped work overrides normal routing. A
  security fix may ship out-of-band as a patch release at any time,
  without waiting for the weekly cycle.
